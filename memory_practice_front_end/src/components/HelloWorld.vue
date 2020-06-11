<template>
  <div>
    <div class="grid-container">
      <div class="header">
      <h2>Memory Application</h2>
    </div>
  
    <!-- need to add routes for this -->
    <div class="left" style="background-color:#aaa;">
      <ul class='recentTries'> Problematic #'s
        <li v-for="x in 4" class="problematicNumbers" :key=x> 
          <!-- Convert this to problematic numbers -->
          {{ recentAttempts[x]["incorrectDigits"] }} 
        </li>
      </ul>
    </div>

    <div class="middle" style="background-color:#bbb;">
      Test
      <ShowDigits />
    </div>  

    
    <!-- need to add routes for this -->
    <div class="right" style="background-color:#ccc;">
      Record:
      {{this.highScore - 2}}

      <br>
      <br>
      <br>

      Average: {{  }}

    </div>
  
    <div class="footer">
      <p class='recentAttempts'>Recent Attempts</p>
      <li v-for="x in 5" class="footerLI" :key=x> 
          Score: {{ recentAttempts[x]["numberOfDigits"] }} 
          <br>
          Incorrect Digit Strings: {{ recentAttempts[x]["mistakenStringOfNums"] }} 
          <br>
          Date: {{ formatDate(recentAttempts[x]["created_at"]) }}
        </li>
    </div>
  </div>
</div>

</template>

<script>
import ShowDigits from './ShowDigits';

export default {
  name: 'HelloWorld',
  computed: {
    recentScores: () => {
      return this.recentAttempts ? this.recentAttempts : 'Not loaded'
    }
  },
  components: { ShowDigits },
  data: () => {
    return {
      highScore: Number,
      recentAttempts: []
    }
  },
  props: {
    msg: String
  },
  async mounted () {
      await fetch('http://localhost:3621/highScore', ({
        method: "GET",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      }))
      .then(response => response.json())
      .then(data => {
        this.highScore = data[0]['MAX(numberOfDigits)']
      })

      await fetch('http://localhost:3621/', ({
        method: "GET",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      }))
      .then(response => response.json())
      .then(data => {
        data.forEach((el, index) => {
          // just get the last 5 digits
          this.recentAttempts.push(el)
        })
      })
  },
  methods: {
    formatDate(nums) {
      let year = nums.slice(0,4)
      let month = nums.slice(5,7)
      let day = nums.slice(8,10)
      
      return(`${month}-${day}-${year}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Style the header */
.header {
  grid-area: header;
  background-color: #f1f1f1;
  padding: 30px;
  text-align: center;
  font-size: 35px;
}

ul {
  list-style-type:none;
}

.problematicNumbers {
  padding-top: 8%;
}

/* The grid container */
.grid-container {
  display: grid;
  grid-template-areas: 
    'header header header header header header' 
    'left middle middle middle middle right' 
    'footer footer footer footer footer footer';
  /* grid-column-gap: 10px; - if you want gap between the columns */
} 

.left,
.middle,
.right {
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

.footerLI {
    list-style-type:none;
    color: black;
    -webkit-border-radius: 12px;
    border: solid gray 1px;
    height: 100px;
    padding-top: 15px;
    margin: 5px;
    /* padding-top: 1%; */
}

/* Style the left column */
.left {
  grid-area: left;
  
}

.recentAttempts {
  height: 20px;
}

.recentTries {
  margin-left: -30px;
}

/* Style the middle column */
.middle {
  grid-area: middle;
}

/* Style the right column */
.right {
  grid-area: right;
}

/* Style the footer */
.footer {
  grid-area: footer;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
  .grid-container  {
    grid-template-areas: 
      'header header header header header header' 
      'left left left left left left' 
      'middle middle middle middle middle middle' 
      'right right right right right right' 
      'footer footer footer footer footer footer';
  }
}
</style>