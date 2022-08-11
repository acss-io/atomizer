const nav = document.getElementById('nav');
const aside = document.getElementById('toc');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
if (nav && aside && header && footer) {
    const navHeight = nav.clientHeight;
    const asideHeight = aside.clientHeight;
    const headerHeight = header.clientHeight;
    const footerHeight = footer.clientHeight;
    let availHeight = document.body.clientHeight - headerHeight - footerHeight;
    const updateSticky = () => {
        if (navHeight > availHeight) {
            document.body.classList.add('navStickyBottom');
        } else {
            document.body.classList.remove('navStickyBottom');
        }
        if (asideHeight > availHeight) {
            document.body.classList.add('tocStickyBottom');
        } else {
            document.body.classList.remove('tocStickyBottom');
        }
    };
    const handleResize = () => {
        availHeight = document.body.clientHeight - headerHeight - footerHeight;
        updateSticky();
    };

    // Scroll throttling
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const doSomething = (scrollPos) => {
        updateSticky();
        if (scrollPos > 0) {
            document.documentElement.classList.add('has-scrolled');
        }
    };

    document.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                doSomething(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });
    // Update our sticky logic when window is resized
    window.addEventListener('resize', () => {
        handleResize();
    });
}

