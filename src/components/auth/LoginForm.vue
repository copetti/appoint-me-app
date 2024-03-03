<script setup>
import { ref } from 'vue';
import { useForm, useField } from "vee-validate";
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/store/auth";

const schema = object({
    email : string().required().email().label('E-mail'),
    password: string().required().label('Password'),
});

const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues:{
        email: 'test@example.com',
        password: 'password'
    }
});

const submit = handleSubmit(async (values) => {
    await login(values)
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const feedbackMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);

function login(values){
    feedbackMessage.value = '';
    loading.value = true;
    authStore
        .sanctum()
        .then(()=>{
            authStore
                .login(values.email, values.password)
                .then(()=>{
                    router.push({ name: 'dashboard' })
                }).catch(()=>{
                    loading.value = false;
                    feedbackMessage.value = 'Your e-mail or password is invalid.'
                });
    });
}

</script>

<template>
    <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{feedbackMessage}}</v-alert>
    <v-form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">E-mail</v-label>
            <v-text-field
                v-model="email"
                variant="outlined"
                color="primary"
                :error-messages="errors.email"
            />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field
                v-model="password"
                variant="outlined"
                type="password"
                color="primary"
                :error-messages="errors.password"
            />
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <v-checkbox
                    v-model="checkbox"
                    color="primary"
                    hide-details
                >
                    <template v-slot:label class="text-body-1">
                        Remeber this Device
                    </template>
                </v-checkbox>
                <div class="ml-sm-auto">
                    <RouterLink
                        to="/"
                        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                    >
                        Forgot Password ?
                    </RouterLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            {{isSubmitting}}
            <v-btn
                type="submit"
                :loading="loading"
                color="primary"
                size="large"
                block
                flat
            >
                Sign in
            </v-btn>
        </v-col>
    </v-row>
    </v-form>
</template>
