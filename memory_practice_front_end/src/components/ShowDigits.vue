<template>
  <div>
    <div class="showInts">
      <p v-if='game === true && timeout === false'>
        {{digits}}
      </p>

      <p v-if='game === true && timeout === true'>
        {{""}}
      </p>

      <p v-if='game === false'>
        Game Over
      </p>
    </div>

    <div>
      <input v-on:keyup.enter="click" v-model='inputDigits' class="input" ref="input" />

      <br>
      <button @click='click' class='btn'>
        <p v-if="this.start">
          Start
        </p>

        <p v-if="this.continue">
          Continue
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      start: true,
      continue: false,
      digits: "",
      round: 0,
      inputDigits: "",
      incorrectInputPairs: "",
      game: true,
      timeout: false
    }
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
    },
    score () {
      if (this.round === 0) {
        return 0
      }
      else {
        return (this.round * 2 - 2)
      }
    },
    async click () {
      this.focusInput()

      if (this.round === 0) {
        await this.incrementNums(this.round)
        this.game = true
        this.start = false;
        this.continue = true;
        await this.timer()
      }
      
      else if (this.inputDigits === this.digits) {
        await this.incrementNums(this.round);
        await this.timer()
        this.timeout = false;
      }

      else if (this.inputDigits !== this.digits) {
        alert(` Game Over! \n Your Answer: ${this.inputDigits} \n Correct Answer: ${this.digits}`)
        await this.incorrectDigitsFunc()
        await this.submitScoreFunc()
        await this.reset()
      }
    },

    incrementNums (round) {
      this.digits = '';

      for (let i = 0; i <= round; i++) {
        let firstNumber = Math.floor(Math.random() * 10)
        let secondNumber = Math.floor(Math.random() * 10)
        let combinedNums = String(String(firstNumber) + String(secondNumber));
        this.digits += combinedNums;
      }
      this.round += 1;
      this.inputDigits = '';
    },

    incorrectDigitsFunc() {
      for (let i = 0; i < (Math.floor(this.digits.length)); i+=2) {
        let digitPair = this.digits.slice(i, i+2);
        let inputPair = this.inputDigits.slice(i, i+2);
        
        if (digitPair !== inputPair) {
          this.incorrectInputPairs += String(digitPair + '-')
        }
      }
      this.incorrectInputPairs = this.incorrectInputPairs.slice(0, -1)
    },
    timer() {
      let numberOfMiliseconds = this.round * 2000
      setTimeout(() => { 
        this.game = true 
        this.timeout = true 
      }, numberOfMiliseconds);
    },
    reset () {
      this.start = true
      this.continue = false
      this.digits = ""
      this.round = 0
      this.inputDigits = ""
      this.incorrectInputPairs = ""
      this.game = true
      this.timeout = false
    },

    async submitScoreFunc () {
      fetch('http://localhost:3621/', {
        method: "POST",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numberOfDigits: this.digits.length !== null ? this.digits.length : 'Not Submitted',
          incorrectDigits: this.inputDigits.length !== this.digits.length ? 'Inputted incorrect number of digits' : this.incorrectInputPairs,
          mistakenStringOfNums: this.digits === "" ? 'Not Submitted' : this.digits,
        })
      })
    }
  }
}
</script>

<style>
.showInts {
  border:black solid 1px;
  color: gray;
  -webkit-border-radius: 12px; 
  margin-top: 12px;
  height: 50px;
  background-color: white;
  text-align: center;
  padding-top: 11px;
  font-size: 20px;
  font-weight: bold;
}
.showInts p {
  margin-top: 6px;
}
.input {
  margin-top: 4%;
  -webkit-border-radius: 12px; 
  height: 50px;
  width: 50%;
  border:black solid 1px;
  font-size: large;
  text-align: center;
  color: gray
}
.btn {
  margin-top: 3%;
  -webkit-border-radius: 12px;
  width: 25%;
  background-color: #4CAF50; /* Green */
  height: 50px;
  font-size: 16px;
  font-weight: bold;
}
</style>