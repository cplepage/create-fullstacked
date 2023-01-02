import FullStackedVersion from "fullstacked/version";

class Version extends HTMLElement{
    async connectedCallback(){
        this.innerHTML += `<div>You are on version <em>${FullStackedVersion}</em></div>`;
    }
}

customElements.define("fullstacked-root", Version);

document.body.append(new Version());
