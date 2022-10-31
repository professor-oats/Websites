<!DOCTYPE html>
<html lang="en">
<head>
<title>freeCodeCamp Survey</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="/styles.css">
<head>
<body id="shapeshifter">
  
  <h1 id="title">This is the freeCodeChimp Survey</h1>
  <p id="description">"OK Código Mono, now it's your time to shine. Give us feedback and get your platanas" - Jonathan Blow</p>
  <form id="survey-form">
    <section id="section1">
    <label id="name-label">Name <input id="name" required type="text" placeholder="Enter your name"/> </label>
    <label id="email-label">Email <input id="email" required type="email" placeholder="Enter your email"/> </label>
    <label id="number-label">Age <input id="number" required min="6" max="75" type="number" placeholder="Choose your age"/></label>
    <label>Which option best describes your current role <select id="dropdown">
       <option value="chimp">Code Chimp</option>
       <option value="monkey">Script Monkey</option>
       <option value="gorilla"> Go(rilla) Coder</option>
      </select>
    </label>
    </section>
    <section id="section2">
    <label><p class="topp">Would you recommend us to a friend for platanas?</p> <input type="radio" name="recommend" value="yes"/><p class="answers">Yes</p> <input type="radio" name="recommend" value="no"/><p class="answers">No</p> <input onclick="getNaranjas()" type="radio" name="recommend" value="naranjas"/><p class="answers">I want naranjas</p>
    </label>
    <label><p class ="bottomp">Here is the qualifying test for platanas. Follow the instructions</p>
    <input name="check" type="checkbox" value="1"/><p class="answers"> Check this one</p>
    <input name="check" type="checkbox" value="2"/><p class="answers"> Check this one too</p>
    <input name="check" type="checkbox" value="3"/><p class="answers"> Never this one</p>
    </label>
    <label><p class="bottomp">Write something stupid in this textarea and hit the submit button for your well earned platanas. Good job mono! </p>
    <textarea placeholder="Write something stupid" rows="4"></textarea>
    </label>
    <input id="submit" type="submit" onclick="getPlatanias();celebratePlatanias()" value="Submit"/>
    </section>
    <section>
      <div id="rollover" class=""></div>
    
    </section>

  </form>
  
  <script>

// Thanks to Chriz Frits @ stackoverflow for this hack
    function getNaranjas() {
      document.getElementById("shapeshifter").classList.add('naranjascene');
    }
    
    function getPlatanias() {
      document.getElementById("shapeshifter").classList.add('plataniascene');
    }
    
    function celebratePlatanias() {
      /* document.getElementById("rollover").classList.add('myroll'); */
      
      /* OMG this is godmode -- Thanks Felix Blaschke for this good solution */
      const rollover = document.body.querySelector("#rollover");
      
      rollover.style.transform = "translateY(100%)";
    }
  
  
  </script>

  
  
</body>


</html>

