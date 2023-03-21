<script setup lang="ts"></script>
<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Login Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css">
  </head>
  <body>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <h1 class="title">Login</h1>
              <form>
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Username">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="Password">
                  </div>
                </div>
                <div class="field">
                  <button class="button is-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
  </html>
  
</template>
<style scoped></style>
