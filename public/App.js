'use strict';

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src\App.svelte generated by Svelte v3.24.1 */

const css = {
	code: "main.svelte-xcp617.svelte-xcp617{text-align:center;padding:1em;margin:0 auto}h4.svelte-xcp617.svelte-xcp617{display:block;color:#80ced7;text-align:left;width:550px;margin:auto;padding:10px 0}label input[type=\"checkbox\"]:checked+span.svelte-xcp617.svelte-xcp617{text-decoration:line-through}h4.svelte-xcp617 button.svelte-xcp617{float:right;cursor:pointer;outline:none;border:none;color:#80ced7;background-color:transparent}h1.svelte-xcp617.svelte-xcp617{color:#80ced7;text-transform:uppercase;font-size:4em;font-weight:100}form.svelte-xcp617.svelte-xcp617{margin:0 auto;display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center}form.svelte-xcp617 input.svelte-xcp617{outline:none;width:550px;border:none;border-radius:20px;padding:10px 0}input[type=\"text\"].svelte-xcp617.svelte-xcp617{width:550px;padding:12px 20px;box-sizing:border-box}form.svelte-xcp617 input.svelte-xcp617::placeholder{color:#00070d;font-weight:400}form.svelte-xcp617 button.svelte-xcp617{outline:none;width:120px;border:none;border-radius:20px;padding:10px 0;cursor:pointer;background-color:rgb(245, 76, 63, 0.7);color:black}form.svelte-xcp617 button.svelte-xcp617:hover{background-color:rgba(245, 75, 63, 0.808)}",
	map: "{\"version\":3,\"file\":\"App.svelte\",\"sources\":[\"App.svelte\"],\"sourcesContent\":[\"<script>\\r\\n  import { text } from \\\"svelte/internal\\\";\\r\\n\\r\\n  let guardarItem = [];\\r\\n  let name = \\\"\\\";\\r\\n\\r\\n  function handleClick() {\\r\\n    var event = window.event || handleClick.caller.arguments[0];\\r\\n    event.preventDefault ? event.preventDefault() : (event.returnValue = false);\\r\\n\\r\\n    guardarItem = guardarItem.concat({ done: false, name });\\r\\n    name = \\\"\\\";\\r\\n\\r\\n    return false;\\r\\n  }\\r\\n\\r\\n  function deleteItem(index) {\\r\\n    guardarItem.splice(index, 1);\\r\\n    guardarItem = guardarItem;\\r\\n  }\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n  main {\\r\\n    text-align: center;\\r\\n    padding: 1em;\\r\\n    margin: 0 auto;\\r\\n  }\\r\\n\\r\\n  h4 {\\r\\n    display: block;\\r\\n    color: #80ced7;\\r\\n    text-align: left;\\r\\n    width: 550px;\\r\\n    margin: auto;\\r\\n    padding: 10px 0;\\r\\n  }\\r\\n\\r\\n  label input[type=\\\"checkbox\\\"]:checked + span {\\r\\n    text-decoration: line-through;\\r\\n  }\\r\\n\\r\\n  h4 button {\\r\\n    float: right;\\r\\n    cursor: pointer;\\r\\n    outline: none;\\r\\n    border: none;\\r\\n    color: #80ced7;\\r\\n    background-color: transparent;\\r\\n  }\\r\\n\\r\\n  h1 {\\r\\n    color: #80ced7;\\r\\n    text-transform: uppercase;\\r\\n    font-size: 4em;\\r\\n    font-weight: 100;\\r\\n  }\\r\\n\\r\\n  form {\\r\\n    margin: 0 auto;\\r\\n    display: flex;\\r\\n    flex-wrap: wrap;\\r\\n    flex-direction: row;\\r\\n    justify-content: center;\\r\\n  }\\r\\n\\r\\n  form input {\\r\\n    outline: none;\\r\\n    width: 550px;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    padding: 10px 0;\\r\\n  }\\r\\n\\r\\n  input[type=\\\"text\\\"] {\\r\\n    width: 550px;\\r\\n    padding: 12px 20px;\\r\\n    box-sizing: border-box;\\r\\n  }\\r\\n\\r\\n  form input::placeholder {\\r\\n    color: #00070d;\\r\\n    font-weight: 400;\\r\\n  }\\r\\n\\r\\n  form button {\\r\\n    outline: none;\\r\\n    width: 120px;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    padding: 10px 0;\\r\\n    cursor: pointer;\\r\\n    background-color: rgb(245, 76, 63, 0.7);\\r\\n    color: black;\\r\\n  }\\r\\n\\r\\n  form button:hover {\\r\\n    background-color: rgba(245, 75, 63, 0.808);\\r\\n  }\\r\\n</style>\\r\\n\\r\\n<main>\\r\\n  <h1>Please input your groceries</h1>\\r\\n\\r\\n  <form id=\\\"formita\\\">\\r\\n    <label for=\\\"itemInput\\\" id=\\\"nameLabel\\\" />\\r\\n    <input type=\\\"text\\\" bind:value={name} placeholder=\\\"Write here...\\\" />\\r\\n\\r\\n    <button on:click={handleClick}>Add Item</button>\\r\\n  </form>\\r\\n\\r\\n  {#each guardarItem as item, i}\\r\\n    <h4>\\r\\n      <label>\\r\\n        <input type=\\\"checkbox\\\" bind:checked={item.done} />\\r\\n        <span>{i + 1}.- {item.name}</span>\\r\\n      </label>\\r\\n      {#if !item.done}\\r\\n        <button\\r\\n          on:click={() => {\\r\\n            deleteItem(i);\\r\\n          }}>\\r\\n          <i class=\\\"fa fa-times\\\" aria-hidden=\\\"true\\\" />\\r\\n        </button>\\r\\n      {/if}\\r\\n    </h4>\\r\\n  {/each}\\r\\n</main>\\r\\n\"],\"names\":[],\"mappings\":\"AAuBE,IAAI,4BAAC,CAAC,AACJ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,EAAE,4BAAC,CAAC,AACF,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CAAC,CAAC,AACjB,CAAC,AAED,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,QAAQ,CAAG,IAAI,4BAAC,CAAC,AAC3C,eAAe,CAAE,YAAY,AAC/B,CAAC,AAED,gBAAE,CAAC,MAAM,cAAC,CAAC,AACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,gBAAgB,CAAE,WAAW,AAC/B,CAAC,AAED,EAAE,4BAAC,CAAC,AACF,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,IAAI,4BAAC,CAAC,AACJ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,kBAAI,CAAC,KAAK,cAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CAAC,CAAC,AACjB,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,4BAAC,CAAC,AAClB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,UAAU,AACxB,CAAC,AAED,kBAAI,CAAC,mBAAK,aAAa,AAAC,CAAC,AACvB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,kBAAI,CAAC,MAAM,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACvC,KAAK,CAAE,KAAK,AACd,CAAC,AAED,kBAAI,CAAC,oBAAM,MAAM,AAAC,CAAC,AACjB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,AAC5C,CAAC\"}"
};

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let guardarItem = [];
	let name = "";

	$$result.css.add(css);

	return `<main class="${"svelte-xcp617"}"><h1 class="${"svelte-xcp617"}">Please input your groceries</h1>

  <form id="${"formita"}" class="${"svelte-xcp617"}"><label for="${"itemInput"}" id="${"nameLabel"}"></label>
    <input type="${"text"}" placeholder="${"Write here..."}" class="${"svelte-xcp617"}"${add_attribute("value", name, 1)}>

    <button class="${"svelte-xcp617"}">Add Item</button></form>

  ${each(guardarItem, (item, i) => `<h4 class="${"svelte-xcp617"}"><label><input type="${"checkbox"}"${add_attribute("checked", item.done, 1)}>
        <span class="${"svelte-xcp617"}">${escape(i + 1)}.- ${escape(item.name)}</span></label>
      ${!item.done
	? `<button class="${"svelte-xcp617"}"><i class="${"fa fa-times"}" aria-hidden="${"true"}"></i>
        </button>`
	: ``}
    </h4>`)}</main>`;
});

module.exports = App;
