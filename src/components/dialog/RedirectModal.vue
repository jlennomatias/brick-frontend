<template>
  <div class="redirect-modal">
    <form>
      <div class="row justify-center header-simple">
        <p class="redirect-text">Redirecionamento</p>
      </div>
      <div class="text-center opf-logo">
        <img
          src="https://openfinancebrasil.org.br/wp-content/themes/openbank/assets/img/logo.png"
          alt=""
          style="width: 50%"
        />
      </div>
      <div class="open-finance-disclaimer">
        <p>Este pagamento será realizado através do Open Finance.</p>
      </div>
      <div class="open-redirect-ifs">
        <div class="if_logo">
          <img class="if_logo" src="src/assets/img/f-icon.png" alt="" />
        </div>
        <div class="arrow-sep">
          <svg
            width="73"
            height="20"
            viewBox="0 0 73 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="66.2836"
              cy="10.3724"
              r="5.51136"
              transform="rotate(90 66.2836 10.3724)"
              fill="#E6E5EA"
              stroke="#E6E5EA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.29492 10.2713L3.19304 10.3732L3.29492 10.4751V10.2713ZM3.70819 10.8884L11.002 18.1822C11.3926 18.5727 11.3926 19.2059 11.002 19.5964C10.6115 19.9869 9.97834 19.9869 9.58781 19.5964L1.07172 11.0803L0.364609 10.3732L1.07172 9.66611L9.58781 1.15001C9.97834 0.759486 10.6115 0.759486 11.002 1.15001C11.3926 1.54053 11.3926 2.1737 11.002 2.56422L4.67788 8.88837L63.2949 8.88837V10.8884L3.70819 10.8884Z"
              fill="#E6E5EA"
            />
          </svg>
        </div>
        <div class="if_logo">
          <img class="if_logo" :src="bankImage" alt="" />
        </div>
      </div>
      <div class="open-finance-message text-center">
        <p>
          Estamos lhe redirecionando devolta para a instituição de onde você
          veio.
        </p>
      </div>
      <div class="spinner">
        <svg
          width="59"
          height="60"
          viewBox="0 0 59 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_11521_462)">
            <path
              opacity="0.15"
              d="M59 29.8732C59 46.1656 45.7924 59.3732 29.5 59.3732C13.2076 59.3732 0 46.1656 0 29.8732C0 13.5808 13.2076 0.37323 29.5 0.37323C45.7924 0.37323 59 13.5808 59 29.8732ZM7.42564 29.8732C7.42564 42.0646 17.3087 51.9476 29.5 51.9476C41.6913 51.9476 51.5744 42.0646 51.5744 29.8732C51.5744 17.6819 41.6913 7.79887 29.5 7.79887C17.3087 7.79887 7.42564 17.6819 7.42564 29.8732Z"
              fill="#555555"
            />
            <path
              d="M15.5626 55.8732C9.62545 52.6906 4.95637 47.5718 2.33155 41.3678C-0.293271 35.1638 -0.715706 28.2483 1.13447 21.771L8.2579 23.8057C6.87236 28.6564 7.18871 33.8352 9.15436 38.4812C11.12 43.1272 14.6165 46.9605 19.0627 49.3438L15.5626 55.8732Z"
              fill="#555555"
            />
          </g>
          <defs>
            <clipPath id="clip0_11521_462">
              <rect
                width="59"
                height="59"
                fill="white"
                transform="translate(0 0.37323)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RedirectModal",
  data() {
    return {
      bankImage: process.env.BANK_IMAGE,
    };
  },
  mounted() {
    const modal = document.querySelector(".redirect-modal");

    setTimeout(() => {
      modal.style.transition = "bottom 1s";
      modal.style.bottom = "0";
    }, 0.1);
  },
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%); /* Start from bottom */
    opacity: 0;
  }
  to {
    transform: translateY(0); /* End at its original position */
    opacity: 1;
  }
}

.redirect-modal {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(238, 238, 238, 1.0);
  border-radius: 10px;
  border: 1px solid #e6e5ea;
  box-shadow: 0px 4px 10px 0px rgba(15, 33, 43, 0.05);
  margin-top: 20px;
  transform: translateY(100%); /* Start position below the screen */
  animation: slideUp 0.4s ease-out forwards; /* Apply the animation */
  position: fixed;
}

.opf-logo {
  margin: 20px 0;
}

.open-finance-disclaimer {
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px;
  line-height: 24px;
  text-align: center;
}

.open-finance-message {
  font-size: 16px;
  font-weight: 300;
  padding: 0 20px;
  line-height: 24px;
  margin-bottom: 20px;
}

.open-redirect-ifs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.arrow-sep {
  margin: 0 10px;
}

.if_logo {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #c5c5c5;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.spinner {
  margin: 20px 0;
}

.spinner svg {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: block;
  animation-name: spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.redirect-text {
    font-size: 40px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
