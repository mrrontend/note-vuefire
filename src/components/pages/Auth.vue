<template>
  <form class="auth-form" v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : loginWithPassword()">
    <h1>{{wantsToSignUp ? 'Sign up' : 'Log in'}}</h1>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required v-model="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required v-model="password">
    </div>
    <div v-show="wantsToSignUp">
      <label for="confirm-password">Confirm Password</label>
      <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword">
    </div>
    <div v-show="!wantsToSignUp" class="clearfix btn-group">
      <button type="submit">Log in</button>
      <button type="button" v-on:click="wantsToSignUp = true">Sign up</button>
    </div>
    <div v-show="wantsToSignUp">
      <button type="submit" class="signup-submit">Sign up</button>
    </div>
    <hr>
    <div class="social-providers">
      <a href="#" v-on:click.prevent="signInWithProvider('facebook')"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
      <a href="#" v-on:click.prevent="signInWithProvider('twitter')"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
      <a href="#" v-on:click.prevent="signInWithProvider('google')"><i class="fa fa-google-plus-square" aria-hidden="true"></i></a>
      <a href="#" v-on:click.prevent="signInWithProvider('github')"><i class="fa fa-github-square" aria-hidden="true"></i></a>
    </div>
  </form>
</template>
<script>
  import Auth from '../../data/Auth'
  import EventBus from '../../components/EventBus'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        wantsToSignUp: false
      }
    },
    methods: {
      signUpWithPassword () {
        if (this.password === this.confirmPassword) {
          Auth.signUpWithPassword({
            email: this.email,
            password: this.password
          })
            .then((userData) => this.loginWithPassword())                                              // signIn
            .then(() => EventBus.$emit('alert', {type: 'success', message: 'Signed up successfully'}))  // let user know everything was successful
            .catch((error) => EventBus.$emit('alert', {type: 'error', message: error.message}))         // tell the user an error occurred
        }
      },
      loginWithPassword () {
        return Auth.loginWithPassword({
          email: this.email,
          password: this.password
        })
          .then((userData) => {
            EventBus.$emit('alert', {type: 'success', message: 'Signed in successfully'})
            this.onSignedIn()
            return userData
          })
          .catch((error) => EventBus.$emit('alert', {type: 'error', message: error.message})) // tell the user an error occurred
      },
      signInWithProvider (provider) {
        Auth.signInWithProvider(provider, (error, authData) => {
          if (error) {
            return EventBus.$emit('alert', {type: 'error', message: error.message})
          }
          this.onSignedIn()
        })
      },
      onSignedIn () {
        this.$router.push({name: 'notes'})
      }
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans');
  .auth-form{
    width: 480px;
    max-width: 100%;
    margin: 25vh auto 15px;
    background: #fff;
    padding: 15px;
    border-radius: 2px;
    box-shadow: 0 1px 5px #ccc;
    font-family: 'Josefin Sans', sans-serif;
    color:#9E9E9E;
  }
  .auth-form h1{
    text-align:center;

  }

  .auth-form > div {
    margin-top: 15px;
  }
  .auth-form input {
    height: 32px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 24px;
  }
  .auth-form input:focus{
    border-bottom:3px solid #FF9800;
  }
  .auth-form label, .auth-form input{
    display: block;
    width: 100%;
  }
  .auth-form button {
    font-size: 22px;
    background: #FF9800;
    border: 1px solid #FF9800;
    padding: 4px 6px;
    margin: 0;
    border-radius: 3px;
    font-family: 'Josefin Sans', sans-serif;
    color:#fff;
    height: 45px;
  }
  .auth-form .btn-group button{
    border-radius: 3px 0 0 3px;
    width: 50%;
    float: left;
  }
  .auth-form .btn-group button + button{
    border-radius: 0 3px 3px 0;
    border-left: none;
  }
  .auth-form .signup-submit{
    width: 100%;
  }
  .auth-form hr{
    margin-top: 20px;
  }
  .auth-form .social-providers{
    text-align: center;
  }
  .auth-form .social-providers a{
    color: #FF9800;
    font-size: 36px;
    padding: 4px;
  }
</style>
