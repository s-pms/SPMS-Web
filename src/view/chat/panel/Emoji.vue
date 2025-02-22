<template>
  <div
    class="emoji slide"
  >
    <div
      ref="list"
      class="list"
    >
      <template
        v-for="(url,index) in imageList"
        :key="url"
      >
        <div
          class="item"
          @click="emits('click',index + 1)"
        >
          <el-image
            :src="url"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline-round" />
              </div>
            </template>
          </el-image>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { useEmoji } from '@/model/chat/hook/useEmoji'

const imageList: Ref<string[]> = ref([])

const { getEmojiUrl } = useEmoji()

for (let i = 1; i <= 100; i += 1) {
  imageList.value.push(getEmojiUrl(i.toString()))
}

const emits = defineEmits(['click'])

</script>
<style lang="scss" scoped>
.emoji {
  position: absolute;
  left: 10px;
  bottom: 160px;
  width: 400px;
  height: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  * {
    user-select: none;
  }

  .list {
    flex: 1;
    position: relative;
    height: 0;
    padding: 10px 15px;
    overflow: hidden;
    overflow-y: auto;
    text-align: left;

    .item {
      display: inline-block;
      width: 10% !important;
      overflow: hidden;

      .el-image {
        border-radius: 10px;
        margin: 0 5px;
        padding: 0;
        cursor: pointer;
        width: auto;
        height: auto;
      }
    }
  }
}
</style>
