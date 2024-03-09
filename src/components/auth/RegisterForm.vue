<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
import { useField, useForm } from "vee-validate";
import {isSchema, object, string} from "yup";
import { useAuthStore } from "@/store/auth";
import {useRouter} from "vue-router";

const schema = object({
    first_name: string().required().label('Nome'),
    email: string().required().email().label('E-mail'),
    password: string().required().min(6).matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'Password must have letters or numbers'
    ).label('Password'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        first_name: 'Jon',
        email: 'jon@snow.com',
        password: 'Password1'
    }
})

const feedbackMessage = ref('');
const loading = ref(false);
const router = useRouter();

const submit = handleSubmit(async (values) => {
    const authStore = useAuthStore();

    await authStore.register(values.first_name, values.email, values.password)
        .then(()=>{
            router.push({ name: 'dashboard' })
        })
        .catch(()=>{
            loading.value = false;
            feedbackMessage.value = `email ${values.email} has been taken.`
        });;
})

const { value: firstName } = useField('first_name')
const { value: email } = useField('email')
const { value: password } = useField('password')
</script>

<template>
    <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{feedbackMessage}}</v-alert>
    <v-form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Name</v-label>
                <v-text-field
                    v-model="firstName"
                    variant="outlined"
                    color="primary"
                    :error-messages="errors.first_name"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Email Address</v-label>
                <v-text-field
                    v-model="email"
                    variant="outlined"
                    type="email"
                    color="primary"
                    :error-messages="errors.email"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field
                    v-model="password"
                    variant="outlined"
                    type="password"
                    color="primary"
                    :error-messages="errors.password"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    :loading="isSubmitting"
                    block
                    flat
                >
                    Sign up
                </v-btn>
            </v-col>
    </v-row>
    </v-form>
</template>
