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
    }
    .responsive-image {
        width: 100%;
        height: 100%;
    }
</style>
