import { ref } from 'vue'

export const useMeteorPaginator = (findAllMethod, limitInitial=10, include=null) => {
    const entities = ref([])
    const limit = ref(limitInitial)
    const page = ref(1)
    const pages = ref(1)
    const count = ref(0)

    const refresh = async () => {
        const params = {
            page: page.value,
            limit: limit.value
        }
        if (include) params.include = include
        const res = await findAllMethod(params);

        entities.value = res.rows;
        pages.value = res.pages;
        count.value = res.count;
    };

    const nextPage = async () => {
        if (page.value < pages.value) {
            page.value++;
            await refresh();
        }
    };

    const previousPage = async () => {
        if (page.value > 1) {
            page.value--;
            await refresh();
        }
    };

    return {
        entities,
        page,
        limit,
        pages,
        count,
        refresh,
        nextPage,
        previousPage
    };
}
