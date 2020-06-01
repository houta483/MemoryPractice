<template>
  <div>
    <div class="grid-container">
      <div class="header">
      <h2>Memory Application</h2>
    </div>
  
    <!-- need to add routes for this -->
    <div class="left" style="background-color:#aaa;">Recent Tries</div>

    <div class="middle" style="background-color:#bbb;">
      Test
      <ShowDigits />
    </div>  

    
    <!-- need to add routes for this -->
    <div class="right" style="background-color:#ccc;">Record</div>
  
    <div class="footer"/>
    <p>Footer</p>
  </div>
</div>

</template>

<script>
import ShowDigits from './ShowDigits';

export default {
  name: 'HelloWorld',
  components: { ShowDigits },
  props: {
    msg: String
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

/* Style the left column */
.left {
  grid-area: left;
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