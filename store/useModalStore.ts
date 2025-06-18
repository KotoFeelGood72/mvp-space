import { defineStore, storeToRefs } from "pinia";

type ModalName = "auth" | "payment"; 

export const useModalStore = defineStore("modal", {
  state: (): { modals: Record<ModalName, boolean> } => ({
    modals: {
      auth: false,
      payment: false,
    },
  }),

  actions: {
    openModal(
      modalName: ModalName,
      options?: {
        router?: any;
        route?: any;
        query?: Record<string, any>;
      }
    ) {
      this.modals[modalName] = true;

      if (options?.router && options?.route && options.query) {
        options.router.replace({
          query: {
            ...options.route.query,
            ...options.query,
            modal: modalName,
          },
        });
      }
    },

    closeModal(modalName: ModalName, router?: any, route?: any): void {
      this.modals[modalName] = false;

      if (router && route) {
        const query = { ...route.query };
        delete query.modal;

        router.replace({
          query: Object.keys(query).length ? query : null,
        });
      }
    },

    closeAllModals(router?: any, route?: any) {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as ModalName] = false;
      });

      if (router && route) {
        router.replace({ query: null });
      }
    },

    checkQueryAndOpenModal(modalFromQuery: any) {
      if (typeof modalFromQuery === "string" && modalFromQuery in this.modals) {
        this.modals[modalFromQuery as ModalName] = true;
      }
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());