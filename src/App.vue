<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    *, *:after, *:before {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
    }
    body {
        font-family: 'Roboto', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
        background-color: #e9ebee;
    }
    .wrapper {
        width: 600px;
        margin: 0 auto;
    }
</style>
