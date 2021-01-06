

export function htmlToElement(html: string) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

export function htmlToClickElement(html: string, onclick_callback: any) {
    let new_elem = htmlToElement(html);
    $(new_elem).on("click", onclick_callback);
    return new_elem;
}

export function htmlToElements(html: string) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

export function clearChildren(elem: ChildNode | HTMLElement) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

// Makes it easier to access things from debug console:
export function bindToWindow(name: string, bind_object: any) {
    (<any>window)[name] = bind_object;
}
// LOL:
bindToWindow('bindToWindow', bindToWindow);

export function bWindow(): any {
    return <any>window;
}