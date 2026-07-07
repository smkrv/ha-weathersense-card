const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:m}=Object,u=globalThis,p=u.trustedTypes,_=p?p.emptyScript:"",g=u.reactiveElementPolyfillSupport,f=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,g?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,x=t=>t,k=y.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,z=`<${E}>`,P=document,H=()=>P.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,W=/>/g,R=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,F=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),V=new WeakMap,K=P.createTreeWalker(P,129);function Z(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===T?"!--"===h[1]?r=O:void 0!==h[1]?r=W:void 0!==h[2]?(F.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=R):void 0!==h[3]&&(r=R):r===R?">"===h[0]?(r=n??T,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?R:'"'===h[3]?D:L):r===D||r===L?r=R:r===O||r===W?r=T:(r=R,n=void 0);const d=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+z:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,c]=q(t,e);if(this.el=J.createElement(h,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),K.nextNode(),a.push({type:2,index:++n});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),U(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!U(a)||a!==this._$AH[r],a===I?t=I:t!==I&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??I)===B)return;const i=this._$AH,s=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==I&&(i===I||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=y.litHtmlPolyfillSupport;nt?.(J,Q),(y.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const ht=o`
  /* === Scale: Normal (defaults) === */
  :host {
    --ws-padding: 24px;
    --ws-radius: 16px;
    --ws-temp-size: 48px;
    --ws-unit-size: 20px;
    --ws-feels-size: 14px;
    --ws-metric-gap: 12px;
    --ws-metric-padding: 14px;
    --ws-metric-radius: 12px;
    --ws-metric-icon-size: 22px;
    --ws-metric-value-size: 18px;
    --ws-metric-label-size: 12px;
    --ws-name-size: 14px;
    --ws-desc-size: 13px;
    --ws-badge-padding: 6px 14px;
    --ws-badge-size: 12px;
    --ws-icon-size: 28px;
    --ws-blob-size: 200px;
    --ws-blob-blur: 60px;
    display: block;
  }

  /* === Scale: Compact === */
  :host(.compact) {
    --ws-padding: 16px;
    --ws-radius: 12px;
    --ws-temp-size: 36px;
    --ws-unit-size: 16px;
    --ws-feels-size: 12px;
    --ws-metric-gap: 8px;
    --ws-metric-padding: 10px;
    --ws-metric-radius: 8px;
    --ws-metric-icon-size: 18px;
    --ws-metric-value-size: 15px;
    --ws-metric-label-size: 11px;
    --ws-name-size: 12px;
    --ws-desc-size: 11px;
    --ws-badge-padding: 4px 10px;
    --ws-badge-size: 11px;
    --ws-icon-size: 22px;
    --ws-blob-size: 140px;
    --ws-blob-blur: 40px;
  }

  /* === Scale: Ultra-Compact === */
  :host(.ultra-compact) {
    --ws-padding: 12px;
    --ws-radius: 8px;
    --ws-temp-size: 28px;
    --ws-unit-size: 13px;
    --ws-feels-size: 11px;
    --ws-metric-gap: 6px;
    --ws-metric-padding: 8px;
    --ws-metric-radius: 6px;
    --ws-metric-icon-size: 16px;
    --ws-metric-value-size: 13px;
    --ws-metric-label-size: 10px;
    --ws-name-size: 11px;
    --ws-desc-size: 10px;
    --ws-badge-padding: 3px 8px;
    --ws-badge-size: 10px;
    --ws-icon-size: 18px;
    --ws-blob-size: 100px;
    --ws-blob-blur: 30px;
  }

  /* === Card Container === */
  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--ws-radius);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--ws-color-bg, #10b981) 14%, var(--card-background-color, #fff)),
      color-mix(in srgb, var(--ws-color-bg, #10b981) 8%, var(--card-background-color, #fff))
    );
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 15%, transparent);
    animation: cardEntrance 0.5s ease-out;
    transition: all 0.3s ease;
  }

  /* === Decorative Blob === */
  .decorative-blob {
    position: absolute;
    top: -30%;
    right: -20%;
    width: var(--ws-blob-size);
    height: var(--ws-blob-size);
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--ws-color-light, #86efac) 12%, transparent),
      transparent 70%
    );
    filter: blur(var(--ws-blob-blur));
    animation: blobFloat 20s infinite ease-in-out;
    pointer-events: none;
    z-index: 0;
  }

  /* === Content === */
  .content-container {
    position: relative;
    z-index: 1;
    padding: var(--ws-padding);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* === Header === */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .card-name {
    font-size: var(--ws-name-size);
    font-weight: 500;
    color: var(--secondary-text-color, #666);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .comfort-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--ws-badge-padding);
    border-radius: 20px;
    font-size: var(--ws-badge-size);
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .comfort-badge.comfy {
    background: color-mix(in srgb, var(--ws-color-bg, #10b981) 15%, transparent);
    color: var(--ws-color-text, #059669);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 25%, transparent);
  }

  .comfort-badge.not-comfy {
    background: color-mix(in srgb, var(--ws-color-bg, #ef4444) 15%, transparent);
    color: var(--ws-color-text, #dc2626);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #f87171) 25%, transparent);
  }

  /* === Temperature Display === */
  .temp-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .temp-icon {
    --mdc-icon-size: var(--ws-icon-size);
    color: var(--ws-color-text, #059669);
    transition: color 0.3s ease;
  }

  .temp-main {
    display: flex;
    flex-direction: column;
  }

  .temp-value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .temp-value {
    font-size: var(--ws-temp-size);
    font-weight: 700;
    line-height: 1;
    color: var(--primary-text-color, #333);
    transition: all 0.3s ease;
  }

  .temp-unit {
    font-size: var(--ws-unit-size);
    font-weight: 400;
    color: var(--secondary-text-color, #666);
  }

  .feels-like {
    font-size: var(--ws-feels-size);
    color: var(--secondary-text-color, #666);
    margin-top: 2px;
  }

  .feels-like-value {
    font-weight: 600;
    color: var(--ws-color-text, #059669);
    transition: color 0.3s ease;
  }

  /* === Method Line === */
  .method-line {
    font-size: var(--ws-desc-size);
    color: var(--secondary-text-color, #666);
    opacity: 0.7;
    font-style: italic;
  }

  /* === Metrics Grid === */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: var(--ws-metric-gap);
  }

  .metric-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--ws-metric-padding);
    border-radius: var(--ws-metric-radius);
    background: color-mix(in srgb, var(--ws-color-light, #86efac) 6%, transparent);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 10%, transparent);
    transition: all 0.3s ease;
    cursor: default;
  }

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--ws-color-bg, #10b981) 15%, transparent);
  }

  .metric-icon {
    --mdc-icon-size: var(--ws-metric-icon-size);
    color: var(--ws-color-text, #059669);
    flex-shrink: 0;
    transition: color 0.3s ease;
  }

  .metric-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .metric-value {
    font-size: var(--ws-metric-value-size);
    font-weight: 600;
    color: var(--primary-text-color, #333);
    line-height: 1.2;
  }

  .metric-label {
    font-size: var(--ws-metric-label-size);
    color: var(--secondary-text-color, #666);
    line-height: 1.2;
  }

  /* === Description === */
  .description-block {
    font-size: var(--ws-desc-size);
    color: var(--secondary-text-color, #666);
    line-height: 1.5;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 10%, transparent);
  }

  /* === Unavailable State === */
  .unavailable {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--ws-padding);
    gap: 8px;
    color: var(--secondary-text-color, #666);
    min-height: 80px;
  }

  .unavailable ha-icon {
    --mdc-icon-size: 32px;
    opacity: 0.5;
  }

  .unavailable span {
    font-size: var(--ws-desc-size);
  }

  /* === Animations === */
  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blobFloat {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(-10px, 15px) scale(1.05);
    }
    66% {
      transform: translate(5px, -10px) scale(0.95);
    }
  }

  /* === Responsive === */
  @media (max-width: 480px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
`,ct={extreme_cold:{bg:"#1e3a8a",light:"#3b82f6",text:"#1e40af"},very_cold:{bg:"#1e40af",light:"#60a5fa",text:"#1e40af"},cold:{bg:"#2563eb",light:"#93c5fd",text:"#1d4ed8"},cool:{bg:"#0891b2",light:"#67e8f9",text:"#0e7490"},slightly_cool:{bg:"#0d9488",light:"#5eead4",text:"#0f766e"},comfortable:{bg:"#10b981",light:"#86efac",text:"#059669"},slightly_warm:{bg:"#f59e0b",light:"#fcd34d",text:"#d97706"},warm:{bg:"#f97316",light:"#fb923c",text:"#ea580c"},hot:{bg:"#ef4444",light:"#f87171",text:"#dc2626"},very_hot:{bg:"#dc2626",light:"#f87171",text:"#b91c1c"},extreme_hot:{bg:"#991b1b",light:"#ef4444",text:"#7f1d1d"}},lt={extreme_cold:"mdi:snowflake-alert",very_cold:"mdi:snowflake-thermometer",cold:"mdi:thermometer-low",cool:"mdi:thermometer-minus",slightly_cool:"mdi:thermometer-minus",comfortable:"mdi:hand-okay",slightly_warm:"mdi:thermometer-plus",warm:"mdi:thermometer-high",hot:"mdi:thermometer-alert",very_hot:"mdi:heat-wave",extreme_hot:"mdi:fire-alert"},dt={scale:"normal",show_humidity:!0,show_wind:!0,wind_unit:"km/h",show_pressure:!0,pressure_unit:"hPa",temperature_unit:"",show_description:!0,show_method:!1};function mt(t,e,i){return e!==i&&i?"°C"===e&&"°F"===i?9*t/5+32:"°F"===e&&"°C"===i?5*(t-32)/9:t:t}function ut(t,e){switch(e){case"m/s":return t;case"km/h":default:return 3.6*t;case"mph":return 2.23694*t;case"knots":return 1.94384*t}}function pt(t,e){switch(e){case"kPa":return t;case"hPa":default:return 10*t;case"mmHg":return 7.50062*t;case"inHg":return.2953*t}}function _t(t,e=0){return null==t||isNaN(t)?"—":Number(t).toFixed(e)}const gt={"°C":"unit_celsius","°F":"unit_fahrenheit",hPa:"unit_hpa",mmHg:"unit_mmhg",inHg:"unit_inhg",kPa:"unit_kpa","m/s":"unit_ms","km/h":"unit_kmh",mph:"unit_mph",knots:"unit_knots"};function ft(t,e,i){const s=gt[t];return s?e(s,i):t}const wt={en:{humidity:"Humidity",wind:"Wind",pressure:"Pressure",entity_unavailable:"Entity not available",feels_like:"Feels like",comfy:"Comfy",not_comfy:"Not Comfy",method_heat_index:"Heat Index",method_wind_chill:"Wind Chill",method_steadman:"Steadman Apparent Temp",method_indoor:"Indoor Comfort",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"knots",editor_entity:"Entity (WeatherSense)",editor_name:"Name (optional)",editor_scale:"Display Scale",editor_show_humidity:"Show humidity",editor_show_wind:"Show wind",editor_wind_unit:"Wind unit",editor_show_pressure:"Show pressure",editor_pressure_unit:"Pressure unit",editor_temperature_unit:"Temperature unit",editor_show_description:"Show description",editor_show_method:"Show calculation method",scale_normal:"Normal",scale_compact:"Compact",scale_ultra_compact:"Ultra Compact"},ru:{humidity:"Влажность",wind:"Ветер",pressure:"Давление",entity_unavailable:"Сущность недоступна",feels_like:"Ощущается как",comfy:"Комфортно",not_comfy:"Некомфортно",method_heat_index:"Индекс жары",method_wind_chill:"Охлаждение ветром",method_steadman:"Температура по Стедману",method_indoor:"Комнатный комфорт",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"гПа",unit_mmhg:"мм рт.ст.",unit_inhg:"дюйм рт.ст.",unit_kpa:"кПа",unit_ms:"м/с",unit_kmh:"км/ч",unit_mph:"миль/ч",unit_knots:"узлы",editor_entity:"Сенсор (WeatherSense)",editor_name:"Название (необязательно)",editor_scale:"Масштаб отображения",editor_show_humidity:"Показать влажность",editor_show_wind:"Показать ветер",editor_wind_unit:"Единица ветра",editor_show_pressure:"Показать давление",editor_pressure_unit:"Единица давления",editor_temperature_unit:"Единица температуры",editor_show_description:"Показать описание",editor_show_method:"Показать метод расчёта",scale_normal:"Обычный",scale_compact:"Компактный",scale_ultra_compact:"Ультракомпактный"},de:{humidity:"Feuchtigkeit",wind:"Wind",pressure:"Luftdruck",entity_unavailable:"Entität nicht verfügbar",feels_like:"Gefühlt",comfy:"Komfortabel",not_comfy:"Unkomfortabel",method_heat_index:"Hitzeindex",method_wind_chill:"Windchill",method_steadman:"Steadman-Temperatur",method_indoor:"Raumkomfort",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"Knoten",editor_entity:"Entität (WeatherSense)",editor_name:"Name (optional)",editor_scale:"Anzeigegröße",editor_show_humidity:"Feuchtigkeit anzeigen",editor_show_wind:"Wind anzeigen",editor_wind_unit:"Windeinheit",editor_show_pressure:"Luftdruck anzeigen",editor_pressure_unit:"Druckeinheit",editor_temperature_unit:"Temperatureinheit",editor_show_description:"Beschreibung anzeigen",editor_show_method:"Berechnungsmethode anzeigen",scale_normal:"Normal",scale_compact:"Kompakt",scale_ultra_compact:"Ultrakompakt"},es:{humidity:"Humedad",wind:"Viento",pressure:"Presión",entity_unavailable:"Entidad no disponible",feels_like:"Sensación",comfy:"Confortable",not_comfy:"Inconfortable",method_heat_index:"Índice de calor",method_wind_chill:"Sensación térmica",method_steadman:"Temperatura Steadman",method_indoor:"Confort interior",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"nudos",editor_entity:"Entidad (WeatherSense)",editor_name:"Nombre (opcional)",editor_scale:"Escala de visualización",editor_show_humidity:"Mostrar humedad",editor_show_wind:"Mostrar viento",editor_wind_unit:"Unidad de viento",editor_show_pressure:"Mostrar presión",editor_pressure_unit:"Unidad de presión",editor_temperature_unit:"Unidad de temperatura",editor_show_description:"Mostrar descripción",editor_show_method:"Mostrar método de cálculo",scale_normal:"Normal",scale_compact:"Compacto",scale_ultra_compact:"Ultra compacto"},hi:{humidity:"आर्द्रता",wind:"हवा",pressure:"दबाव",entity_unavailable:"एंटिटी उपलब्ध नहीं है",feels_like:"महसूस होता है",comfy:"आरामदायक",not_comfy:"असुविधाजनक",method_heat_index:"ऊष्मा सूचकांक",method_wind_chill:"शीत वायु",method_steadman:"स्टेडमैन तापमान",method_indoor:"इनडोर आराम",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"नॉट्स",editor_entity:"एंटिटी (WeatherSense)",editor_name:"नाम (वैकल्पिक)",editor_scale:"प्रदर्शन पैमाना",editor_show_humidity:"आर्द्रता दिखाएं",editor_show_wind:"हवा दिखाएं",editor_wind_unit:"हवा इकाई",editor_show_pressure:"दबाव दिखाएं",editor_pressure_unit:"दबाव इकाई",editor_temperature_unit:"तापमान इकाई",editor_show_description:"विवरण दिखाएं",editor_show_method:"गणना विधि दिखाएं",scale_normal:"सामान्य",scale_compact:"कॉम्पैक्ट",scale_ultra_compact:"अल्ट्रा कॉम्पैक्ट"},"zh-CN":{humidity:"湿度",wind:"风速",pressure:"气压",entity_unavailable:"实体不可用",feels_like:"体感",comfy:"舒适",not_comfy:"不舒适",method_heat_index:"酷热指数",method_wind_chill:"风寒指数",method_steadman:"斯特德曼体感温度",method_indoor:"室内舒适度",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"节",editor_entity:"实体 (WeatherSense)",editor_name:"名称（可选）",editor_scale:"显示比例",editor_show_humidity:"显示湿度",editor_show_wind:"显示风速",editor_wind_unit:"风速单位",editor_show_pressure:"显示气压",editor_pressure_unit:"气压单位",editor_temperature_unit:"温度单位",editor_show_description:"显示描述",editor_show_method:"显示计算方法",scale_normal:"标准",scale_compact:"紧凑",scale_ultra_compact:"超紧凑"},cs:{humidity:"Vlhkost",wind:"Vítr",pressure:"Tlak",entity_unavailable:"Entita není dostupná",feels_like:"Pocitově",comfy:"Komfortní",not_comfy:"Nekomfortní",method_heat_index:"Teplotní index",method_wind_chill:"Větrný chlad",method_steadman:"Steadmanova teplota",method_indoor:"Vnitřní komfort",unit_celsius:"°C",unit_fahrenheit:"°F",unit_hpa:"hPa",unit_mmhg:"mmHg",unit_inhg:"inHg",unit_kpa:"kPa",unit_ms:"m/s",unit_kmh:"km/h",unit_mph:"mph",unit_knots:"uzly",editor_entity:"Entita (WeatherSense)",editor_name:"Název (volitelné)",editor_scale:"Měřítko zobrazení",editor_show_humidity:"Zobrazit vlhkost",editor_show_wind:"Zobrazit vítr",editor_wind_unit:"Jednotka větru",editor_show_pressure:"Zobrazit tlak",editor_pressure_unit:"Jednotka tlaku",editor_temperature_unit:"Jednotka teploty",editor_show_description:"Zobrazit popis",editor_show_method:"Zobrazit metodu výpočtu",scale_normal:"Normální",scale_compact:"Kompaktní",scale_ultra_compact:"Ultra kompaktní"}};function vt(t,e){const i=function(t){if(!t)return"en";const e=t.toLowerCase().replace("_","-");return e.startsWith("zh")?"zh-CN":e.startsWith("cs")?"cs":e.split("-")[0]}(e?.language);return wt[i]?.[t]||wt.en[t]||t}customElements.define("weathersense-card-editor",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object,state:!0}}}static get styles(){return o`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 4px 0;
      }
      .switch-label {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
      }
      ha-entity-picker,
      ha-textfield,
      ha-select {
        width: 100%;
      }
      .unit-select {
        margin-left: 36px;
      }
    `}setConfig(t){this._config={...dt,...t}}_fireConfigChanged(){clearTimeout(this._debounce),this._debounce=setTimeout(()=>{this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config}},bubbles:!0,composed:!0}))},200)}_entityChanged(t){this._config={...this._config,entity:t.detail.value},this._fireConfigChanged()}_nameChanged(t){this._config={...this._config,name:t.target.value},this._fireConfigChanged()}_selectChanged(t,e){this._config={...this._config,[t]:e.detail.value},this._fireConfigChanged()}_switchChanged(t,e){this._config={...this._config,[t]:e.target.checked},this._fireConfigChanged()}_handleSelectClosed(t){t.stopPropagation()}render(){return this.hass&&this._config?j`
      <div class="card-config">

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.entity||""}
          .label=${vt("editor_entity",this.hass)}
          .includeDomains=${["sensor"]}
          allow-custom-entity
          @value-changed=${this._entityChanged}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this._config.name||""}
          .label=${vt("editor_name",this.hass)}
          @input=${this._nameChanged}
        ></ha-textfield>

        <ha-select
          .value=${this._config.scale||"normal"}
          .label=${vt("editor_scale",this.hass)}
          @selected=${t=>this._selectChanged("scale",t)}
          @closed=${this._handleSelectClosed}
          fixedMenuPosition
          naturalMenuWidth
        >
          <mwc-list-item value="normal">${vt("scale_normal",this.hass)}</mwc-list-item>
          <mwc-list-item value="compact">${vt("scale_compact",this.hass)}</mwc-list-item>
          <mwc-list-item value="ultra-compact">${vt("scale_ultra_compact",this.hass)}</mwc-list-item>
        </ha-select>

        <ha-select
          .value=${this._config.temperature_unit||""}
          .label=${vt("editor_temperature_unit",this.hass)}
          @selected=${t=>this._selectChanged("temperature_unit",t)}
          @closed=${this._handleSelectClosed}
          fixedMenuPosition
          naturalMenuWidth
        >
          <mwc-list-item value="">Auto</mwc-list-item>
          <mwc-list-item value="°C">${vt("unit_celsius",this.hass)}</mwc-list-item>
          <mwc-list-item value="°F">${vt("unit_fahrenheit",this.hass)}</mwc-list-item>
        </ha-select>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_humidity}
            @change=${t=>this._switchChanged("show_humidity",t)}
          ></ha-switch>
          <span class="switch-label">${vt("editor_show_humidity",this.hass)}</span>
        </div>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_wind}
            @change=${t=>this._switchChanged("show_wind",t)}
          ></ha-switch>
          <span class="switch-label">${vt("editor_show_wind",this.hass)}</span>
        </div>

        ${this._config.show_wind?j`
          <ha-select
            class="unit-select"
            .value=${this._config.wind_unit||"km/h"}
            .label=${vt("editor_wind_unit",this.hass)}
            @selected=${t=>this._selectChanged("wind_unit",t)}
            @closed=${this._handleSelectClosed}
            fixedMenuPosition
            naturalMenuWidth
          >
            <mwc-list-item value="m/s">${vt("unit_ms",this.hass)}</mwc-list-item>
            <mwc-list-item value="km/h">${vt("unit_kmh",this.hass)}</mwc-list-item>
            <mwc-list-item value="mph">${vt("unit_mph",this.hass)}</mwc-list-item>
            <mwc-list-item value="knots">${vt("unit_knots",this.hass)}</mwc-list-item>
          </ha-select>
        `:I}

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_pressure}
            @change=${t=>this._switchChanged("show_pressure",t)}
          ></ha-switch>
          <span class="switch-label">${vt("editor_show_pressure",this.hass)}</span>
        </div>

        ${this._config.show_pressure?j`
          <ha-select
            class="unit-select"
            .value=${this._config.pressure_unit||"hPa"}
            .label=${vt("editor_pressure_unit",this.hass)}
            @selected=${t=>this._selectChanged("pressure_unit",t)}
            @closed=${this._handleSelectClosed}
            fixedMenuPosition
            naturalMenuWidth
          >
            <mwc-list-item value="hPa">${vt("unit_hpa",this.hass)}</mwc-list-item>
            <mwc-list-item value="mmHg">${vt("unit_mmhg",this.hass)}</mwc-list-item>
            <mwc-list-item value="inHg">${vt("unit_inhg",this.hass)}</mwc-list-item>
            <mwc-list-item value="kPa">${vt("unit_kpa",this.hass)}</mwc-list-item>
          </ha-select>
        `:I}

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_description}
            @change=${t=>this._switchChanged("show_description",t)}
          ></ha-switch>
          <span class="switch-label">${vt("editor_show_description",this.hass)}</span>
        </div>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_method}
            @change=${t=>this._switchChanged("show_method",t)}
          ></ha-switch>
          <span class="switch-label">${vt("editor_show_method",this.hass)}</span>
        </div>

      </div>
    `:I}});customElements.define("weathersense-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object,state:!0}}}static get styles(){return ht}static getConfigElement(){return document.createElement("weathersense-card-editor")}static getStubConfig(){return{entity:"",name:"WeatherSense",scale:"normal"}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this._config={...dt,...t}}getCardSize(){return"ultra-compact"===this._config?.scale?1:"compact"===this._config?.scale?2:4}updated(t){if(super.updated(t),!this.hass||!this._config)return;const e=this.hass.states[this._config.entity];if(!e)return;const i=this._getComfortLevel(e.attributes),s=ct[i]||ct.comfortable;this.style.setProperty("--ws-color-bg",s.bg),this.style.setProperty("--ws-color-light",s.light),this.style.setProperty("--ws-color-text",s.text),this.classList.remove("compact","ultra-compact"),"compact"===this._config.scale?this.classList.add("compact"):"ultra-compact"===this._config.scale&&this.classList.add("ultra-compact")}_getComfortLevel(t){const e=t.comfort_level||"comfortable";return ct[e]?e:String(e).toLowerCase().replace(/ /g,"_")}_getDisplayUnit(t){return this._config.temperature_unit||t.attributes.unit_of_measurement||"°C"}_getTemperature(t){const e=parseFloat(t.attributes.temperature),i=t.attributes.temperature_unit||"°C",s=this._getDisplayUnit(t);return{value:_t(mt(e,i,s),1),unit:s}}_getFeelsLike(t){return _t(mt(parseFloat(t.state),t.attributes.unit_of_measurement||"°C",this._getDisplayUnit(t)),1)}_getWind(t){const e=parseFloat(t.attributes.wind_speed),i=this._config.wind_unit||"km/h";return{value:_t(ut(e,i),1),unit:i}}_getPressure(t){const e=parseFloat(t.attributes.pressure),i=this._config.pressure_unit||"hPa";return{value:_t(pt(e,i),1),unit:i}}_getMethodLabel(t){const e=t.attributes.calculation_method_key;if(e){const t=vt(`method_${e}`,this.hass);if(t!==`method_${e}`)return t}return t.attributes.calculation_method||null}render(){if(!this.hass||!this._config)return j`<ha-card><div class="unavailable"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>Not configured</span></div></ha-card>`;const t=this.hass.states[this._config.entity];if(!t||"unavailable"===t.state||"unknown"===t.state)return j`<ha-card><div class="unavailable"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${vt("entity_unavailable",this.hass)}</span></div></ha-card>`;const e=t.attributes,i=this._getComfortLevel(e),s=lt[i]||lt.comfortable,n=e.is_comfortable,o=this._getTemperature(t),r=this._getFeelsLike(t),a=this._config.name||e.friendly_name||"WeatherSense",h=this._config.show_humidity&&void 0!==e.humidity,c=this._config.show_wind&&void 0!==e.wind_speed,l=this._config.show_pressure&&void 0!==e.pressure,d=this._config.show_description&&e.comfort_description,m=this._config.show_method&&e.calculation_method,u=c?this._getWind(t):null,p=l?this._getPressure(t):null,_=h||c||l;return j`
      <ha-card>
        <div class="decorative-blob"></div>
        <div class="content-container">

          <div class="header">
            <span class="card-name">${a}</span>
            <span class="comfort-badge ${n?"comfy":"not-comfy"}">
              ${vt(n?"comfy":"not_comfy",this.hass)}
            </span>
          </div>

          <div class="temp-section">
            <ha-icon class="temp-icon" .icon=${s}></ha-icon>
            <div class="temp-main">
              <div class="temp-value-row">
                <span class="temp-value">${o.value}</span>
                <span class="temp-unit">${ft(o.unit,vt,this.hass)}</span>
              </div>
              <span class="feels-like">
                ${vt("feels_like",this.hass)}
                <span class="feels-like-value">${r}${ft(o.unit,vt,this.hass)}</span>
              </span>
            </div>
          </div>

          ${m?j`
            <div class="method-line">${this._getMethodLabel(t)}</div>
          `:I}

          ${_?j`
            <div class="metrics-grid">
              ${h?j`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:water-percent"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${_t(e.humidity,0)}%</span>
                    <span class="metric-label">${vt("humidity",this.hass)}</span>
                  </div>
                </div>
              `:I}

              ${c?j`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:weather-windy"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${u.value} ${ft(u.unit,vt,this.hass)}</span>
                    <span class="metric-label">${vt("wind",this.hass)}</span>
                  </div>
                </div>
              `:I}

              ${l?j`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:gauge"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${p.value} ${ft(p.unit,vt,this.hass)}</span>
                    <span class="metric-label">${vt("pressure",this.hass)}</span>
                  </div>
                </div>
              `:I}
            </div>
          `:I}

          ${d?j`
            <div class="description-block">${e.comfort_description}</div>
          `:I}

        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"weathersense-card",name:"WeatherSense Card",description:"Comfort monitoring card for WeatherSense integration",preview:!0,documentationURL:"https://github.com/smkrv/ha-weathersense-card"});
