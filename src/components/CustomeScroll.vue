<!-- <template>
    <div class="data-block">
        <div class="data-title">
            标题
        </div>
        <div class="data-content" ref="scrollContainer">
            <div class="scroll-content" :style="{ transform: `translateY(${scrollY}px)` }">
                <div class="list-item" v-for="item in displayItems" :key="item.id">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';

export default defineComponent({
    setup() {
        const items = ref(Array.from({ length: 30 }, (_, i) => ({ id: i, value: i + 1 })));
        const displayItems = computed(() => [...items.value, ...items.value]);
        const scrollContainer = ref<HTMLElement | null>(null);
        const scrollY = ref(0);
        const itemHeight = ref(0);
        const containerHeight = ref(0);
        const totalHeight = computed(() => items.value.length * itemHeight.value);

        const isScrolling = ref(true);

        onMounted(() => {
            if (scrollContainer.value) {
                const firstItem = scrollContainer.value.querySelector('.list-item');
                if (firstItem) {
                    itemHeight.value = firstItem.clientHeight;
                }
                containerHeight.value = scrollContainer.value.clientHeight;
            }

            startScrolling();
        });

        const updateScroll = () => {
            scrollY.value -= 1;
            if (scrollY.value <= -totalHeight.value) {
                scrollY.value = 0;
            }
        };

        const startScrolling = () => {
            let lastTime = performance.now();
            const animate = (time: number) => {
                if (isScrolling.value) {
                    if (time - lastTime > 10) {  // 控制滚动速度，每50ms移动一次
                        updateScroll();
                        lastTime = time;
                    }
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        };

        return {
            displayItems,
            scrollContainer,
            scrollY,
            isScrolling,
        };
    },
});
</script>

<style scoped>
.data-block {
    width: 300px;
    margin: 16px;
}

.data-title {
    background: rgba(27, 126, 242, 0.2);
    border-left: 4px solid rgb(0, 117, 255);
    padding: 8px;
    color: #fff;
    display: flex;
    align-items: center;
}

.data-content {
    height: 300px;
    overflow: hidden;
    margin-top: 1px;
    position: relative;
}

.scroll-content {
    position: absolute;
    width: 100%;
    transition: transform 0.1s linear;
}

.list-item {
    background: rgba(27, 126, 242, 0.2);
    padding: 4px 6px;
    border: 1px solid #0075FF;
    margin-top: 2px;
    color: #fff;
    font-weight: bold;
}
</style> -->



<!-- <template>
    <div class="data-block">
      <div class="data-title">
        标题
      </div>
      <div v-scroll="200" class="data-content" ref="scrollContainer">
        <div class="scroll-content">
          <div class="list-item" v-for="item in displayItems" :key="item.id">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  
  export default defineComponent({
    setup() {
      const items = ref(Array.from({ length: 30 }, (_, i) => ({ id: i, value: i + 1 })));
      const displayItems = ref([...items.value, ...items.value]);
      const scrollContainer = ref<HTMLElement | null>(null);
      const scrollHeight = ref(0);
      const scrollTop = ref(0);
  
      onMounted(() => {
        if (scrollContainer.value) {
          scrollHeight.value = scrollContainer.value.scrollHeight / 2;
        }
      });
  
      const updateDisplayItems = () => {
        if (scrollTop.value >= scrollHeight.value) {
          scrollTop.value -= scrollHeight.value;
          if (scrollContainer.value) {
            scrollContainer.value.scrollTop = scrollTop.value;
          }
        } else if (scrollTop.value <= 0) {
          scrollTop.value += scrollHeight.value;
          if (scrollContainer.value) {
            scrollContainer.value.scrollTop = scrollTop.value;
          }
        }
      };
  
      return {
        displayItems,
        scrollContainer,
        updateDisplayItems,
      };
    },
    directives: {
      scroll: {
        mounted(el, binding = { value: 45 }) {
          const gap = 1000 / binding.value;
          let isUsing = false;
          let animationId: number | null = null;
  
          el.addEventListener('mouseleave', () => {
            isUsing = false;
            if (!animationId) {
              scrollAnimation();
            }
          }, { passive: true });
  
          el.addEventListener('wheel', () => {
            isUsing = true;
          }, { passive: true });
  
          el.addEventListener('click', () => {
            isUsing = true;
          }, { passive: true });
  
          const scrollAnimation = (timeStamp = 0, preTimeStamp = 0, diff = 0) => {
            if (isUsing) {
              animationId = null;
              return;
            }
  
            const currentDiff = preTimeStamp === 0 ? 0 : timeStamp - preTimeStamp;
            const n_diff = currentDiff + diff;
  
            if (n_diff < gap) {
              animationId = requestAnimationFrame((_timeStamp) => scrollAnimation(_timeStamp, timeStamp, n_diff));
              return;
            }
  
            el.scrollTop += 1;
            (el as any).__vue__?.updateDisplayItems();
  
            animationId = requestAnimationFrame((_timeStamp) => scrollAnimation(_timeStamp, timeStamp, 0));
          };
  
          scrollAnimation();
        },
        unmounted(el) {
          // Clean up any event listeners or animation frames if necessary
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .data-block {
    width: 300px;
    margin: 16px;
  }
  
  .data-title {
    background: rgba(27, 126, 242, 0.2);
    border-left: 4px solid rgb(0, 117, 255);
    padding: 8px;
    color: #fff;
    display: flex;
    align-items: center;
  }
  
  .data-content {
    height: 300px;
    overflow-y: auto;
    margin-top: 1px;
  }
  
  .list-item {
    background: rgba(27, 126, 242, 0.2);
    padding: 4px 6px;
    border: 1px solid #0075FF;
    margin-top: 2px;
    color: #fff;
    font-weight: bold;
  }
  
  ::-webkit-scrollbar {
    display: none !important;
  }
  
  ::-webkit-scrollbar-track {
    display: none !important;
  }
  
  ::-webkit-scrollbar-thumb {
    display: none !important;
  }
  
  ::-webkit-scrollbar-thumb:window-inactive {
    background: transparent !important;
    display: none !important;
  }
  </style> -->














<template>
    <div class="data-block">
      <div class="data-title">
        标题
      </div>
      <div v-scroll="200" class="data-content">
        <div class="list-item" v-for="(i) in state.dataList">
          {{ i }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { defineComponent, ref, reactive } from 'vue';
  
  export default defineComponent({
    setup() {
      const count = ref(0);
      const state = reactive({
        dataList: [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
      })
      function addCount() {
        count.value += 1;
      }
      return {
        count,
        addCount,
        state
      };
    },
    directives: {
      scroll: {
      arr: {},
      mounted(el, binding = { value: 45 }, vnode, prevVnode) {
          const gap = 1000 / binding.value;  // 帧数差距， 浏览器大概1s 60帧， 数字 > 60 效果应该一致，数字越小越慢
          if (window.requestAnimationFrame) {
              let isUsing = false;    // 是否介入操作；介入操作时暂停动画；
  
              // 鼠标移出时，继续动画
              el.addEventListener('mouseleave', () => {
                  isUsing && scrollAnimation(); // 如果动画已暂停，重置动画
                  isUsing = false;
              }, { passive: true } )
  
              // 鼠标滚动时，继续动画
              el.addEventListener('wheel', () => {
                  isUsing = true;
              }, { passive: true } )
  
              // 鼠标点击时， 暂停动画
              el.addEventListener('click', () => {
                  isUsing = true;
              }, { passive: true } )
  
              // 动画方法
              const scrollAnimation = () => {
                  if (window.requestAnimationFrame) {
                      
   
                      /**
                       * @Author: Damon Liu
                       * @Date: 2024-04-29 10:28:37
                       * @LastEditors: Damon Liu
                       * @LastEditTime: 
                       * @Description: 
                       * @param {*} timeStamp 当前时间戳
                       * @param {*} preTimeStamp 上一帧时间戳
                       * @param {*} diff  累计的时间差
                       */
                      let animationFun = (timeStamp, preTimeStamp = 0, diff = 0) => {
                          if (isUsing) {
                              return
                          }
                          /* if(count < 2) {
                              count++;
                              window.requestAnimationFrame(animationFun);
                              return ;
                          }
                          else {
                              count = 0;
                          } */
                          //preStamp = timpStamp;
                          let currentDiff = preTimeStamp === 0 ? 0 : timeStamp - preTimeStamp;    // 当前时间差
                          let n_diff = currentDiff + diff;    // 总时间差
                          // 当总时间差比小于帧数差距时，不执行动画，申请下一帧执行
                          if(n_diff < gap) {
                              window.requestAnimationFrame((_timeStamp) => animationFun(_timeStamp, timeStamp, n_diff))
                              return ;
                          }
                          let scrollTop = el.scrollTop;   // 滚动条顶部
                          let clientHeight = el.clientHeight; // 内容高度
                          let scrollHeight = el.scrollHeight; // 滚动内容高度
                          // 当没有滚动至底部时
                          if (scrollTop + clientHeight < scrollHeight) {
                              el.scrollTop = scrollTop + 1;
                              window.requestAnimationFrame((_timeStamp) => animationFun(_timeStamp, timeStamp, 0));
                          }
                          // 滚动至底部重置动画
                          else {
                              el.scrollTop = 0;
                              scrollAnimation();
                          }
                      }
                      // 开始动画
                      window.requestAnimationFrame(animationFun);
                  }
  
              }
              scrollAnimation()
          }
          else {
  
          }
      },
      unmounted(el, binding, vnode, prevVnode) {
         
      }
  }
    }
  });
  </script>
  
  <style>
    .count {
      color: red;
    }
.data-block {
  width: 300px;
  margin: 16px;
}

.data-title {
   background: rgba(27, 126, 242, 0.2);
    border-left: 4px solid rgb(0, 117, 255);
    padding: 8px;
    color: #fff;
    display: flex;
    align-items: center;
}

.data-content {
  height: 300px;
  overflow-y: auto;
  margin-top: 1px;
}

.list-item {
  background: rgba(27, 126, 242, 0.2);
  padding: 4px 6px;
  border: 1px solid #0075FF;
  margin-top: 2px;
  color: #fff;
  font-weight: bold;
}

::-webkit-scrollbar {
    display: none !important;

}

/* 滚动槽 */
::-webkit-scrollbar-track {
    display: none !important;

}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    display: none !important;
}

::-webkit-scrollbar-thumb:window-inactive {
    background: transparent !important;
    display: none !important;

}
  </style>