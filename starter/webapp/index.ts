import FullStackedVersion from "fullstacked/version";
import {fetch} from "fullstacked/webapp/fetch";

class Version extends HTMLElement{
    async connectedCallback(){
        this.innerHTML += `<div>You are on version <em>${FullStackedVersion}</em></div>`;
        this.innerHTML += `<div>${await fetch.get("/hello")}</div>`
    }
}

customElements.define("fullstacked-version", Version);
