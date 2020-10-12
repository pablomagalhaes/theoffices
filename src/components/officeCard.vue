<template>
	<div class="my-6">

		<div v-if="showCard">
			<div
				:class="this.picked"
				class="shadow-custom h-card py-12 px-6 rounded-lg relative z-10 text-white flex items-center justify-between"
			>
				<div>
					<h3 class="text-2xl font-semibold leading-9">
						{{ this.title }}
					</h3>
					<p class="text-base leading-6 font-light">{{ this.address }}</p>
				</div>


				<button
					class="focus:outline-none"
					@click="isOpen = !isOpen; isEditing = false"
				>
						<Chevron v-bind:class="{ 'rotate' : isOpen }"></Chevron>
				</button>
			</div>

			<transition name="slide-open">
				<div v-if="isOpen" class="shadow-custom bg-white px-6 py-4 -mt-1 rounded-lg px-6">
					<h4
						class="text-xl font-semibold leading-1875 text-dark-blue mt-6 mb-2"
					>
						{{ this.name }}
					</h4>
					<p class="text-base text-dark-blue font-light leading-6 mb-2">
						{{ this.jobPosition }}
					</p>
					<a
						:href="'mailto:' + this.email"
						class="text-base text-accent-blue font-light leading-6 mb-2 inline-block w-full"
					>
						{{ this.email }}
					</a>
					<span
						class="text-base text-dark-blue font-light leading-6 mb-4 inline-block"
					>
						{{ this.phone }}
					</span>

					<hr class="border-light-gray" />

					<div class="flex justify-between mt-4 mb-2">
						<button
							@click="updateCard"
							class="focus:outline-none uppercase text-xs text-primary-gray flex items-center"
						>
							<Edit></Edit>
							edit
						</button>

						<button
							@click="deleteCard(data)"
							class="focus:outline-none uppercase text-xs text-accent-red flex items-center"
						>
							<Trash></Trash>
							delete
						</button>
					</div>
				</div>
			</transition>
		</div>

		<transition name="slide-form">
			<div v-if="isEditing">
				<div
					class="form-wrapper"
				>
					<div class="flex items-center justify-between mb-10">
						<h3 class="text-base font-bold text-dark-blue">
							Edit Location
						</h3>

						<button
							class="focus:outline-none"
							@click="isEditing = !isEditing; showCard = !showCard"
						>
							<Close></Close>
						</button>
					</div>

					<form
						id="form"
						@submit="sendForm"
						novalidate="true"
						method="post"
					>
						<div
							@click="colorOpen = !colorOpen"
							:class="picked"
							class="h-select w-full rounded-lg flex items-center justify-center mb-6 shadow-custom"
						>
							<p
								class="text-white font-bold inline-flex items-center text-base"
							>
								Select Color
								<Chevron class="ml-4"></Chevron>
							</p>
						</div>

						<div
							v-bind:key="item"
							v-for="item in bgOptions"
							class="relative h-select mb-2"
						>
							<input
								v-model="picked"
								class="hidden width"
								type="radio"
								name="background"
								:id="item.value"
								:value="item.value"
							/>
							<label
								:class="item.value"
								:for="item.value"
								class="absolute w-full h-select rounded-lg flex items-center justify-center"
							>
								<Check />
							</label>
						</div>

						<div class="mt-6 mb-6">
							<label class="custom-label" for="title">Title *</label>
							<div class="container-input">
								<input
									v-bind:class="{
										'border-incorrect': errors.title,
										'border-filled': !errors.title
									}"
									v-model="title"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="title"
									type="text"
									placeholder="Ex: Office"
								/>

								<Attention
									v-bind:class="{
										visible: errors.title,
										invisible: !errors.title
									}"
									class="absolute mr-3"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.title,
									invisible: !errors.title
								}"
								class="custom-error"
								>{{ errors.title }}</span
							>
						</div>

						<div class="mb-6">
							<label class="custom-label" for="address">Enter the address *</label>
							<div class="container-input">
								<input
									v-bind:class="{
										'border-incorrect': errors.address,
										'border-filled': !errors.address
									}"
									v-model="address"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="address"
									type="text"
									placeholder="Ex: 31 W. Dallas St."
								/>
								<Attention
									v-bind:class="{
										visible: errors.address,
										invisible: !errors.address
									}"
									class="icon-attention"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.address,
									invisible: !errors.address
								}"
								class="custom-error"
								>{{ errors.address }}</span
							>
						</div>

						<p
							class="uppercase text-accent-blue mb-4 text-xs font-light"
						>
							Contact Information
						</p>
						<hr class="mb-6 border-light-gray" />

						<div class="mb-6">
							<label class="custom-label" for="fullName">Full name *</label>
							<div class="container-input">
								<input
									v-bind:class="{
										'border-incorrect': errors.name,
										'border-filled': !errors.name
									}"
									v-model="name"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="fullName"
									type="text"
									placeholder="Ex: John Doe"
								/>
								<Attention
									v-bind:class="{
										visible: errors.name,
										invisible: !errors.name
									}"
									class="icon-attention"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.name,
									invisible: !errors.name
								}"
								class="custom-error"
								>{{ errors.name }}</span
							>
						</div>

						<div class="mb-6">
							<label class="custom-label" for="jobPosition">Job Position *</label>
							<div class="container-input">
								<input
									v-bind:class="{
										'border-incorrect':
											errors.jobPosition,
										'border-filled': !errors.jobPosition
									}"
									v-model="jobPosition"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="jobPosition"
									type="text"
									placeholder="Ex: Developer"
								/>
								<Attention
									v-bind:class="{
										visible: errors.jobPosition,
										invisible: !errors.jobPosition
									}"
									class="icon-attention"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.jobPosition,
									invisible: !errors.jobPosition
								}"
								class="custom-error"
								>{{ errors.jobPosition }}</span
							>
						</div>

						<div class="mb-6">
							<label class="custom-label" for="email">Email address *</label>
							<div class="container-input">
								<input
									v-bind:class="{
										'border-incorrect': errors.email,
										'border-filled': !errors.email
									}"
									v-model="email"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="email"
									type="email"
									placeholder="name@example.com"
								/>
								<Attention
									v-bind:class="{
										visible: errors.email,
										invisible: !errors.email
									}"
									class="icon-attention"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.email,
									invisible: !errors.email
								}"
								class="custom-error"
								>{{ errors.email }}</span
							>
						</div>

						<div class="mb-6">
							<label class="custom-label" for="phone">Phone *</label>
							<div class="container-input">
								<input
									v-mask="'(XXX) XXX-XXXX'"
									v-bind:class="{
										'border-incorrect': errors.phone,
										'border-filled': !errors.phone
									}"
									v-model="phone"
									class="custom-input shadow border border-empty focus:outline-none focus:border-focused"
									id="phone"
									type="text"
									placeholder="(xxx) xxx-xxxx"
								/>
								<Attention
									v-bind:class="{
										visible: errors.phone,
										invisible: !errors.phone
									}"
									class="icon-attention"
								>
								</Attention>
							</div>
							<span
								v-bind:class="{
									visible: errors.phone,
									invisible: !errors.phone
								}"
								class="custom-error"
								>{{ errors.phone }}</span
							>
						</div>

						<button
							type="submit"
							class="btn-submit bg-accent-blue"
							:disabled="isDisabled"
						>
							Save
						</button>
					</form>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>

import Check from "../assets/icons/check.vue";
import Attention from "../assets/icons/attention.vue";
import Close from "../assets/icons/close.vue";
import Edit from "../assets/icons/edit.vue";
import Chevron from "../assets/icons/chevron.vue";
import Trash from "../assets/icons/trash.vue";
import { mask } from "vue-the-mask";

export default {
	props: ["data"],
	data: function(){
		return{
			isOpen: false,
			showCard: true,
			isEditing: false,
			colorOpen: false,
			disabledButton: true,
			errors: {
				title: null,
				address: null,
				name: null,
				jobPosition: null,
				email: null,
				phone: null
			},
			picked: this.data.bg,
			title: this.data.title,
			address: this.data.address,
			name: this.data.name,
			jobPosition: this.data.jobPosition,
			email: this.data.email,
			phone: this.data.phone,
			emailValidator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
			bgOptions: [
				{value: "bg-accent-yellow"},
				{value: "bg-accent-red"},
				{value: "bg-accent-blue"},
				{value: "bg-primary-gray"},
				{value: "bg-dark-blue"}
			]
		}
	},
	directives:{
		mask
	},
	components: {
		Check,
		Close,
		Edit,
		Chevron,
		Trash,
		Attention
	},
	computed: {
		isDisabled(){
			return !this.title || !this.address || !this.name || !this.jobPosition || !this.email || !this.phone
		}
	},
	methods: {
		deleteCard: function(data){
			$nuxt.$emit('removeCard', data);
		},
		updateCard: function(){
			this.isEditing = true;
			this.showCard = false;
			this.isOpen = false;
		},
		sendForm: function(e) {
			e.preventDefault();
			this.errors = [];

			if (!this.title) {
				this.errors.title = "Field title cannot be empty";
				return;
			}
			if (!this.address) {
				this.errors.address = "Field address cannot be empty";
				return;
			}
			if (!this.name) {
				this.errors.name = "Field name cannot be empty";
				return;
			}
			if (!this.jobPosition) {
				this.errors.jobPosition = "Field job position cannot be empty";
				return;
			}
			if (!this.email) {
				this.errors.email = "Field email cannot be empty";
				return
			} else if (!this.validEmail(this.email)){
				this.errors.email = "Enter a valid email";
				return
			}
			if (!this.phone) {
				this.errors.phone = "Field phone cannot be empty";
				return;
			}

			this.disabledButton = true;

			this.bg = this.picked,
			this.title = this.title,
			this.address = this.address,
			this.name = this.name,
			this.jobPosition = this.jobPosition,
			this.email = this.email,
			this.phone = this.phone

			const updatedData = {
				bg: this.bg,
				title: this.title,
				address: this.address,
				name: this.name,
				jobPosition: this.jobPosition,
				email: this.email,
				phone: this.phone,
			};

			this.showCard = true;
			this.isEditing = false;

			$nuxt.$emit('updateCard', updatedData);
		},
		validEmail: function (email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}
};
</script>

<style lang="scss">

	.rotate{
		transition: all .3s;
		transform: rotate(180deg);
	}

</style>
