<template>
	<main class="bg-body min-h-screen h-screen fixed w-screen overflow-scroll mb-12">

		<h1
			class="text-accent-blue text-6xl font-thin text-center absolute inset-y-160 w-full"
		>
			Offices
		</h1>

		<section class="absolute bg-body inset-y-272 w-full">
			<div class="container mx-auto">

				<OfficeForm></OfficeForm>

				<div v-bind:key="card" v-for="card in cards" >
					<OfficeCard :data="card"></OfficeCard>
				</div>

				<div class="text-center my-6">
					<p class="text-base text-primary-gray mb-2">This project is for test purpose only.</p>
					<a class="uppercase text-accent-blue text-xs" href="https://www.dogandponystudios.com" target="_blank">www.dogandponystudios.com</a>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import Add from "../assets/icons/add.vue";
import Chevron from "../assets/icons/chevron.vue";
import Attention from "../assets/icons/attention.vue";

import OfficeCard from "../components/officeCard.vue";
import OfficeForm from "../components/form.vue";

export default {
	name: 'Home',
	data: function() {
		return {
			cards: [],
			showNotification: false
		};
	},
	components: {
		OfficeCard,
		OfficeForm,
	},

};
</script>

<style lang="scss">

	.notification{
		@apply flex bg-white items-center justify-center uppercase text-dark-blue text-xs;
		height: 80px;
		font-weight: regular;
		border-top: 2px solid #33A6BA;

		span > svg{
			margin-right: 21px;

			path{
				stroke: #33A6BA;
			}
		}

		button{
			@apply absolute;
			right: 39.51px;

			&:focus{
				outline: none;
			}
		}
	}

	.btn-submit:disabled{
		@apply bg-primary-gray cursor-not-allowed;
	}

	.form-wrapper{
		@apply shadow-custom bg-white py-4 px-6 rounded-lg relative z-10;
	}

	.btn-submit{
		@apply text-white font-light py-2 px-4 rounded;
	}

	.custom-label{
		@apply block text-base text-dark-blue my-1 font-light;
	}

	.container-input{
		@apply relative flex items-center;
	}

	.custom-input{
		@apply rounded w-full py-2 px-3 text-primary-gray;
	}

	.custom-error{
		@apply text-xs text-accent-red font-light;
	}

	.icon-attention{
		@apply absolute mr-3;
	}

	.slide-open{
		&-enter-active{
			transition: all .3s ease;
		}

		&-leave-active{
			transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}

		&-enter{
			transform: translateY(-100px);
		}

		&-leave-to{
			transform: translateY(-100px);
			opacity: 0;
		}
	}

	.slide-form{
		&-enter-active{
			transition: all .5s ease;
		}

		&-leave-active{
			transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}

		&-enter{
			transform: translateY(100px);
		}

		&-leave-to{
			transform: translateY(100px);
			opacity: 0;
		}
	}

	input[type="radio"]:not(:checked) + label svg {
		display: none;
	}

	input[type="radio"]:checked + label svg {
		display: flex;
	}

	input + svg {
		right: 0;
	}
</style>
