import { ref } from 'vue'

export const usePaginator = (requestType, findAllMethod, entitiesKey, limitInitial=10) => {
    const entities = ref([])
    const limit = ref(limitInitial)
    const page = ref(1)
    const pages = ref(1)

    const refresh = async () => {
        const res = await findAllMethod(new requestType({
            page: page.value,
            limit: limit.value
        }));

        entities.value = res[entitiesKey];
        pages.value = res.pages;
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
        refresh,
        nextPage,
        previousPage
    };
}
