<script setup lang="ts">
</script>
<template>
<h2>Login</h2>
<form>
    <div>
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>
      <br>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>
          
      <button type="submit">Login</button>
      <label>
        <br>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </div>
    <div>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
</form>
</template>
<style scoped>
</style>