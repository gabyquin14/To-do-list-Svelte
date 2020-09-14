<script>
  import { text } from "svelte/internal";

  let guardarItem = [];
  let name = "";

  function handleClick() {
    var event = window.event || handleClick.caller.arguments[0];
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);

    guardarItem = guardarItem.concat({ done: false, name });
    name = "";

    return false;
  }

  function deleteItem(index) {
    guardarItem.splice(index, 1);
    guardarItem = guardarItem;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h4 {
    display: block;
    color: #80ced7;
    text-align: left;
    width: 550px;
    margin: auto;
    padding: 10px 0;
  }

  label input[type="checkbox"]:checked + span {
    text-decoration: line-through;
  }

  h4 button {
    float: right;
    cursor: pointer;
    outline: none;
    border: none;
    color: #80ced7;
    background-color: transparent;
  }

  h1 {
    color: #80ced7;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  form {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  form input {
    outline: none;
    width: 550px;
    border: none;
    border-radius: 20px;
    padding: 10px 0;
  }

  input[type="text"] {
    width: 550px;
    padding: 12px 20px;
    box-sizing: border-box;
  }

  form input::placeholder {
    color: #00070d;
    font-weight: 400;
  }

  form button {
    outline: none;
    width: 120px;
    border: none;
    border-radius: 20px;
    padding: 10px 0;
    cursor: pointer;
    background-color: rgb(245, 76, 63, 0.7);
    color: black;
  }

  form button:hover {
    background-color: rgba(245, 75, 63, 0.808);
  }
</style>

<main>
  <h1>Please input your groceries</h1>

  <form id="formita">
    <label for="itemInput" id="nameLabel" />
    <input type="text" bind:value={name} placeholder="Write here..." />

    <button on:click={handleClick}>Add Item</button>
  </form>

  {#each guardarItem as item, i}
    <h4>
      <label>
        <input type="checkbox" bind:checked={item.done} />
        <span>{i + 1}.- {item.name}</span>
      </label>
      {#if !item.done}
        <button
          on:click={() => {
            deleteItem(i);
          }}>
          <i class="fa fa-times" aria-hidden="true" />
        </button>
      {/if}
    </h4>
  {/each}
</main>
