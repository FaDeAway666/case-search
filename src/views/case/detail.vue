<template>
  <v-layout height="100vh">
    <v-app-bar height="48" rounded>
      <template v-slot:prepend>
        <v-app-bar-nav-icon icon="mdi-arrow-left" @click="router.back()"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>案件详情</v-app-bar-title>
    </v-app-bar>
    <v-main class="bg-white overflow-y-auto">
      <v-data-table
        style="margin-top: 16px"
        :headers="headers"
        :items="tableData"
        :loading="loading"
        hide-default-footer
        hide-default-header
      >
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
        </template>
        <template v-slot:item="{ item }">
          <tr class="text-no-wrap">
            <td>{{ item.name }}</td>
            <td class="text-end text-wrap">
              <template v-if="item.name === '案件状态'">
                <v-chip :text="item.value" color="primary"></v-chip>
              </template>
              <template v-else-if="item.name === '立案金额'">
                <span>{{ item.value.toLocaleString() }}</span>
              </template>
              <template v-else>
                <span>{{ item.value }}</span>
              </template>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Value', key: 'value' },
];
const labelMap = {
  caseName: '案件名称',
  applicant: '申请人',
  respondent: '被申请人',
  applyTime: '申请时间',
  filingAmount: '立案金额(元)',
  filingTime: '立案时间',
  status: '案件状态',
};

const tableData = ref<{ name: string; value: string }[]>([]);
const loading = ref(false);

const getDetail = async () => {
  loading.value = true;
  const res = await fetch(`/api/case/detail?id=${id}`, {
    method: 'get',
  });
  const result = await res.json();
  const data = [];
  for (const key in labelMap) {
    data.push({
      name: labelMap[key as keyof typeof labelMap],
      value: result.data[key],
    });
  }
  tableData.value = data;
  loading.value = false;
  console.log(data, route.params);
};

onMounted(() => {
  getDetail();
});
</script>
