<template>
  <v-layout height="100vh">
    <v-app-bar height="48" rounded>
      <v-app-bar-title class="text-center text-">案件搜索</v-app-bar-title>
    </v-app-bar>
    <v-main class="bg-white overflow-y-auto">
      <v-card class="w-100">
        <v-card-text>
          <v-text-field
            v-model="searchParams.searchText"
            class="mb-2"
            label="仲裁调解案号或当事人姓名"
            density="comfortable"
            hide-details="auto"
          ></v-text-field>
          <v-select
            v-model="searchParams.identity"
            class="mb-2"
            label="我的身份"
            density="comfortable"
            hide-details="auto"
            :items="identityOptions"
            item-title="state"
            item-value="abbr"
          ></v-select>
          <v-date-input
            v-model="searchParams.createTime"
            label="提交日期"
            prepend-icon=""
            multiple="range"
            density="comfortable"
            hide-details="auto"
            :hide-actions="false"
          ></v-date-input>
          <v-select
            v-model="searchParams.endOrNot"
            class="mb-2"
            label="结案与否"
            density="comfortable"
            hide-details="auto"
            :items="endOrNotOptions"
            item-title="state"
            item-value="abbr"
          ></v-select>
          <v-select
            v-model="searchParams.stage"
            class="mb-2"
            label="案件阶段"
            density="comfortable"
            hide-details="auto"
            :items="stageOptions"
            item-title="state"
            item-value="abbr"
          ></v-select>
          <v-select
            v-model="searchParams.status"
            class="mb-2"
            label="结案状态"
            density="comfortable"
            hide-details="auto"
            :items="statusOptions"
            item-title="state"
            item-value="abbr"
          ></v-select>
          <v-btn @click="getCaseList(1)" color="primary" class="mr-2">搜索</v-btn>
          <v-btn @click="() => resetSearch()">清空</v-btn>
        </v-card-text>
      </v-card>
      <v-list activatable>
        <template v-if="searchLoading">
          <v-skeleton-loader type="list-item-two-line@5"></v-skeleton-loader>
        </template>

        <template v-else>
          <v-list-item
            v-for="item in listData"
            :key="item.id"
            height="64"
            class="border-b"
            @click="handleClick(item.id)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.createTime }}</v-list-item-subtitle>

            <template #append>
              <v-chip size="small" color="primary">{{ item.status }}</v-chip>
            </template>
          </v-list-item>
        </template>
      </v-list>

      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-pagination size="small" v-model="pagination.page" :length="totalPage" @update:modelValue="getCaseList" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const listData = ref<Record<string, any>[]>([]);
const pagination = reactive({
  page: 1,
  pageSize: 5,
  total: 0,
});
const totalPage = computed(() => {
  return Math.ceil(pagination.total / pagination.pageSize);
});

const identityOptions = [
  { state: '全部', abbr: undefined },
  { state: '申请人', abbr: '0' },
  { state: '被申请人', abbr: '1' },
];

const endOrNotOptions = [
  { state: '全部', abbr: undefined },
  { state: '已结案', abbr: '0' },
  { state: '未结案', abbr: '1' },
];

const stageOptions = [
  { state: '全部', abbr: undefined },
  { state: '调解申请', abbr: '0' },
  { state: '选择仲调员', abbr: '1' },
  { state: '案件调解', abbr: '2' },
];

const statusOptions = [
  { state: '全部', abbr: undefined },
  { state: '撤回结案', abbr: '0' },
  { state: '拒绝调解', abbr: '1' },
  { state: '调解期限届满', abbr: '2' },
  { state: '达成调解协议', abbr: '3' },
  { state: '终止程序', abbr: '4' },
  { state: '无调解成功可能', abbr: '5' },
];

const searchLoading = ref(false);
const searchParams = reactive({
  searchText: undefined,
  identity: undefined,
  createTime: undefined,
  endOrNot: undefined,
  stage: undefined,
  status: undefined,
});

const getCaseList = async (page: number = 1) => {
  searchLoading.value = true;
  const params = {
    page,
    pageSize: pagination.pageSize,
    ...searchParams,
  };
  console.log(params);
  const res = await fetch('/api/case/list', {
    method: 'post',
    body: JSON.stringify(params),
  });
  const data = await res.json();
  listData.value = data.data.list;
  pagination.total = data.data.total;
  searchLoading.value = false;
};

const resetSearch = () => {
  searchParams.searchText = undefined;
  searchParams.identity = undefined;
  searchParams.createTime = undefined;
  searchParams.endOrNot = undefined;
  searchParams.stage = undefined;
  searchParams.status = undefined;
  getCaseList(1);
};

const handleClick = (id: string) => {
  router.push(`/case/${id}`);
};

onMounted(() => {
  getCaseList();
});
</script>
