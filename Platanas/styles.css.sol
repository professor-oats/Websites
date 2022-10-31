body {
  margin: 0 auto;
  background-image: linear-gradient(to bottom right, orange, yellow);
  text-align: center;
  background-size: cover;
}

*::before,
*::after {
  box-sizing: border-box;
}

.clearfix:before,				/* This and following clearfixes may be substituted with a more modern one @W3schools */
.clearfix:after {				/* See file explanation_clearfix.txt */
  content: "";
  display: table;
 }
  
.clearfix:after {
  clear: both;
 }
  
.clearfix {
  zoom: 1;
}

h1 {
  color: white;
  font-size: 280%;
  padding: 0 1em;
  font-family: sans-serif;
  text-align: center;
}

#description {
  font-size: 1rem;
  width: 50%;
  padding-left: 25%;
}

form {
  margin: 0 auto;
  /*width: 80%; */
  /* min-width: 300px; */
  max-width: 700px;
  background-color: #272746;
  padding: 2.5rem 2.5rem;
  border-radius: 0.25rem;
  color: white;
  text-align: left;
  font-size: 22px;
  margin-top: 2.5rem;
}

input,
button,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1.8rem;
}

textarea {
  margin-top: 2%;
}

input[type=submit] {
  max-width: 300px;
  text-align: center;
  font-weight: bold;
  width: 50%;
  margin: 0 25%;
  margin-bottom: 15%; /* dirty hack? */
  margin-top: 5%;
  
}

input[type=radio], input[type=checkbox] {
  display: inline-block;
  width: 5%;
  vertical-align: middle;
  margin-top: 1.1em; /* check this */
}

.answers {
  width: 94%;
  display: inline-block;
  margin: 0;
}

.topp {
  margin-top: 6%; /* this could be defined in #section2 */
  margin-bottom: 3%;
}

.bottomp {
  margin-top: 8%;
  margin-bottom: 3%;
}

/* mobile friendly alternative to using background-attachment: fixed */
/* Yanked from FreeCodeCamp stylesheet */

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: linear-gradient(to bottom right, orange, yellow);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.plataniascene::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: url(/home/montami/FreeCodeCamp/banana1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.naranjascene::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: url(/home/montami/FreeCodeCamp/wallpaper.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

#rollover {
  --rolltop: -100%;
  --rollmaxheight: 200%; 
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-height: var(--rollmaxheight);
  position: absolute;
  bottom: 0px;
  left: 0px;
  top: var(--rolltop);  /* Let us roll it from top because this is just a simple pleb project */
  background-image: url(/home/montami/FreeCodeCamp/donkey-kong.gif);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;
  /* transition-porperty: max-height;
  transition-delay: 2s;
  transition-duration: 4s; */

  transition: transform 2500ms linear 2000ms;

}

.myroll {
  --rollmaxheight: 200%;
 }

