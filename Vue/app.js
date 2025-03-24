const { createApp } = Vue;

createApp({
  data() {
    return {
      countryName: '',       // Input field value
      countries: [],         // List of countries fetched from the API
      errorMessage: ''       // Error message for invalid input or API issues
    };
  },
  methods: {
    async fetchCountryData() {
      // Clear previous results and error messages
      this.countries = [];
      this.errorMessage = '';

      if (!this.countryName.trim()) {
        this.errorMessage = 'Please enter a country name.';
        return;
      }

      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${this.countryName}`);
        if (!response.ok) {
          throw new Error('Country not found or API error.');
        }

        const data = await response.json();
        this.countries = data;
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
}).mount('#app');