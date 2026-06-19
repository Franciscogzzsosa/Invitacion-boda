const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initPdfViewer();
});

function initPdfViewer() {
    const dialog = document.getElementById('pdf-modal');
    const viewerContainer = document.getElementById('pdf-viewer-container');
    const viewer = document.getElementById('pdf-viewer');
    const frame = document.getElementById('pdf-modal-frame');
    const title = document.getElementById('pdf-modal-title');
    const openLink = document.getElementById('pdf-modal-open');
    const pageLabel = document.getElementById('pdf-modal-page');
    const prevButton = document.getElementById('pdf-modal-prev');
    const nextButton = document.getElementById('pdf-modal-next');
    const zoomOutButton = document.getElementById('pdf-modal-zoom-out');
    const zoomInButton = document.getElementById('pdf-modal-zoom-in');
    const triggers = document.querySelectorAll('a[data-pdf-title]');

    if (!dialog || !viewerContainer || !viewer || !frame || !title || !openLink || !triggers.length) return;

    let pdfSlick = null;
    let store = null;
    let unsubscribe = null;

    const setFallbackMode = (enabled, pdfUrl = '') => {
        dialog.classList.toggle('is-fallback-pdf', enabled);
        frame.src = enabled ? pdfUrl : '';
    };

    const syncControls = () => {
        const state = store?.getState();
        const pageNumber = state?.pageNumber || 0;
        const numPages = state?.numPages || 0;

        if (pageLabel) pageLabel.textContent = numPages ? `${pageNumber} / ${numPages}` : '-- / --';
        if (prevButton) prevButton.disabled = !numPages || pageNumber <= 1;
        if (nextButton) nextButton.disabled = !numPages || pageNumber >= numPages;
    };

    const ensurePdfSlick = async () => {
        const pdfSlickCore = window.PDFSlickCore;
        if (!pdfSlickCore) {
            throw new Error('PDFSlickCore no esta disponible.');
        }

        if (window.pdfjsLib?.GlobalWorkerOptions) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        }

        if (!pdfSlick) {
            store = pdfSlickCore.create();
            pdfSlick = new pdfSlickCore.PDFSlick({
                container: viewerContainer,
                viewer,
                store,
                options: {
                    scaleValue: 'page-fit',
                    removePageBorders: true,
                },
            });
            store.setState({ pdfSlick });
            unsubscribe = store.subscribe(syncControls);
        }

        return pdfSlick;
    };

    const openDialog = () => {
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
    };

    const openPdf = async (pdfUrl, pdfTitle) => {
        title.textContent = pdfTitle || 'PDF';
        openLink.href = pdfUrl;
        pageLabel.textContent = 'Cargando...';
        setFallbackMode(false);
        openDialog();

        try {
            const slick = await ensurePdfSlick();
            await slick.loadDocument(pdfUrl);
            slick.currentScaleValue = 'page-fit';
            syncControls();
        } catch (error) {
            console.warn('PDFSlick no pudo cargar el PDF. Usando visor nativo.', error);
            setFallbackMode(true, pdfUrl);
            if (pageLabel) pageLabel.textContent = 'Vista nativa';
        }
    };

    const close = () => {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
        setFallbackMode(false);
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const pdfUrl = trigger.getAttribute('href');
            if (!pdfUrl) return;
            openPdf(pdfUrl, trigger.dataset.pdfTitle);
        });
    });

    prevButton?.addEventListener('click', () => {
        const state = store?.getState();
        if (!pdfSlick || !state) return;
        pdfSlick.gotoPage(Math.max(state.pageNumber - 1, 1));
    });

    nextButton?.addEventListener('click', () => {
        const state = store?.getState();
        if (!pdfSlick || !state) return;
        pdfSlick.gotoPage(Math.min(state.pageNumber + 1, state.numPages));
    });

    zoomOutButton?.addEventListener('click', () => {
        pdfSlick?.decreaseScale();
    });

    zoomInButton?.addEventListener('click', () => {
        pdfSlick?.increaseScale();
    });

    dialog.querySelector('.pdf-modal-close')?.addEventListener('click', close);
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dialog.open) close();
    });

    window.addEventListener('beforeunload', () => {
        unsubscribe?.();
        pdfSlick?._cleanup();
    });
}
