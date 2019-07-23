
const state = {
    showSidebar: true,
    miniSidebar: false,
}


const  MINIMIZE_SIDEBAR = function(state, {show}) {
    state.miniSidebar = show || !state.miniSidebar
    const brand = 'brand-minimized';
    const mini = 'sidebar-minimized';
    if (state.miniSidebar) {
        document.body.classList.add(brand);
        document.body.classList.add(mini);
    }
    else {
        document.body.classList.remove(brand);
        document.body.classList.remove(mini);
    }
};

const TOGGLE_SIDEBAR = function(state, {show}) {
    state.showSidebar = show || !state.showSidebar
    const cls = 'sidebar-show';
    const lg = 'sidebar-lg-show';
    
    if (window.innerWidth <  992 &&
        !document.body.classList.contains(cls) && 
        document.body.classList.contains(lg))
        state.showSidebar = true;

    if (state.showSidebar) {
        document.body.classList.add(cls);
        document.body.classList.add(lg);
    }
    else {
        document.body.classList.remove(cls);
        document.body.classList.remove(lg);
    }
};

const actions = {
    TOGGLE_SIDEBAR,
    MINIMIZE_SIDEBAR,
}

export default {
    state,
    actions,
}