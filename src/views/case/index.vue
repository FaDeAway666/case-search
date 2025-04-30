<template>
  <v-layout height="100vh">
    <v-app-bar height="48" rounded>
      <v-app-bar-title class="text-center text-">案件搜索</v-app-bar-title>
    </v-app-bar>
    <v-main class="bg-white overflow-y-auto">
      <v-card class="w-100">
        <v-card-text>
          <v-row>
            <v-text-field
              v-model="searchParams.searchText"
              class="mb-2"
              label="Search templates"
              density="compact"
              hide-details="auto"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="searchParams.searchText"
              label="Search templates"
              density="compact"
            ></v-text-field>
          </v-row>
        </v-card-text>
      </v-card>
      <v-list activatable>
        <v-list-item v-for="item in listData" :key="item.id" height="64" class="border-b">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.createTime }}</v-list-item-subtitle>

          <template #append>
            <v-chip size="small" color="primary">{{ item.status }}</v-chip>
          </template>
        </v-list-item>
      </v-list>

      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-pagination size="small" v-model="pagination.page" :length="totalPage" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';

const listData = ref<Record<string, any>[]>([]);
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});
const totalPage = computed(() => {
  return Math.ceil(pagination.total / pagination.pageSize);
});

const searchLoading = ref(false);
const searchParams = reactive({
  searchText: undefined,
  identity: undefined,
  createTime: undefined,
  endOrNot: undefined,
  stage: undefined,
  status: undefined,

})

const getCaseList = async () => {
  const res = await fetch('/api/case/list', {
    method: 'post',
    body: JSON.stringify({
      page: pagination.page,
      pageSize: pagination.pageSize,
    }),
  });
  const data = await res.json();
  listData.value = data.data.list;
  pagination.total = data.data.total;
};

onMounted(() => {
  getCaseList();
})
</script>
