<template>
  <div class="CardPlace">
    <div>
      <IconButtons iconName="mdi-light:heart" />
      <img :src="card.img" />
    </div>
    <div>
      <div>
        <div>
          {{ card.address }}
        </div>
        <ul>
          <li>
            <div class="icon">
              <Icon name="noto:star" />
            </div>
            <p>5.0</p>
          </li>
          <li>2 отзыва</li>
        </ul>
      </div>
      <div>
        <p>{{ card.type }}</p>
        <h3>{{ card.title }}</h3>
      </div>
      <div>
        <ul>
          <li v-for="(item, i) in card.characters">
            <span>{{ item.label }}</span>
            <div>
              <div class="icon">
                <Icon :name="item.icon" />
              </div>
              <p>{{ item.param }}</p>
            </div>
          </li>
        </ul>
        <div>{{ card.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButtons from "../Buttons/IconButtons.vue";

defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss"></style>
