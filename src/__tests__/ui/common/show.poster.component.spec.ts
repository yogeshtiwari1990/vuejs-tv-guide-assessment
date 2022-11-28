import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";

import Poster from "@/ui/common/show-poster.vue";

describe("ShowComponent.vue", () => {
  const vuetify = createVuetify();

  it("should renders is page content is correct", () => {
    const wrapper = mount(Poster, {
      props: { src: "SRC", name: "Name" },

      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper).not.undefined;
  });
});
