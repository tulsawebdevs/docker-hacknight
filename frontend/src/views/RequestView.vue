<script lang='ts' setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
interface Request {
	method: string,
	path: string,
	timestamp: string
}
let requests = ref<Request[]>([]);

onMounted(async () => requests.value = (await axios.get('/api/requests')).data)
</script>

<template>
	<div class="container">
		<h1 class="title">
			Requests
		</h1>
		<ul v-if="requests.length > 0">
			<li v-for="(request, index) in requests" :key="index">
			{{ request.method }} {{ request.path }} {{ new Date(request.timestamp).toISOString() }}
			</li>
		</ul>
		<div v-else class="container">
			<p>No greetings sent yet = lonely server</p>
			<router-link to="/">Home</router-link>
		</div>
	</div>
</template>

<style>
.container{
	display:flex;
	flex-direction: column;
	margin:auto;
	justify-content: center;
	align-items: center;
}

.title{
	padding: .5rem;
	text-align: center;
}

li{
	padding: .25rem .5rem;
	border-bottom: solid 1px darkgray;	
	background-color:#EEE;
}

li:nth-child(even){
	background-color: #CCC;
}
</style>
