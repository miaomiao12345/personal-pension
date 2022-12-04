<template>
<div class="person-pension">
  <div>距离退休还有<el-input-number v-model="years" :max="60"></el-input-number>年</div>
  <div>存款利率为<el-input v-model="rate"></el-input>%</div>
  <div>税率为<el-input v-model.number="taxRate"></el-input>%</div>
  <div id="lf-container" v-loading="lfLoading"></div>
</div>
</template>

<script>
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css';
import {getGraphData} from './util'

export default {
  name: '',
  components: {},
  data () {
    return {
      years: '',
      rate: 2,
      taxRate: 20,
      drawTimer: '',
      lfLoading: false
    }
  },
  watch: {
    'years': {
      handler (val) {
        if (val && this.rate && this.taxRate) {
          this.$_startDraw()
        } else {
          this.$_stopDraw()
        }
      },
      immediate: true
    },
    'rate': {
      handler (val) {
        if (val && this.years && this.taxRate) {
          this.$_startDraw()
        } else {
          this.$_stopDraw()
        }
      },
      immediate: true
    },
    'taxRate': {
      handler (val) {
        if (val && this.years && this.rate) {
          this.$_startDraw()
        } else {
          this.$_stopDraw()
        }
      },
      immediate: true
    }
  },
  methods: {
    $_startDraw () {
      this.drawTimer = setTimeout(this.$_render(), 500)
    },
    $_stopDraw () {
      clearTimeout(this.drawTimer)
    },
    $_render () {
      const regex = /^[0-9]+(\.[0-9]+)?$/i
      if (!regex.exec(this.rate)) {
        this.$message.error('请输入正确的税率')
        return
      }
      this.lfLoading = true
      if (!this.lf) {
        this.lf = new LogicFlow({
          container: document.querySelector('#lf-container'),
          isSilentMode: true,
          grid: {
            size: 1, // 影响坐标计算
            visible: false,
          },
          keyboard: {
            enabled: true,
          },
          edgeTextDraggable: true,
          adjustEdgeMiddle: true,
          style: {
            rect: {
              stroke: '#859CBA',
              strokeWidth: 1,
              height: 40
            },
            polyline: {
              stroke: '#859CBA',
              strokeWidth: 1,
              hoverStroke: '#859CBA',
              selectedStroke: '#859CBA',
            },
            edgeText: {
              background: {
                fill: '#F7F7F7',
              },
              hoverBackground: {
                fill: '#F7F7F7',
              },
            },
          }
        })
        this.lf.on('graph:rendered', () => {
          this.lfLoading = false
        })
      }
      const {years, rate, taxRate} = this
      this.lf.render(getGraphData({years, rate, taxRate}))
    }
  }
}
</script>

<style scoped>
.person-pension {
  text-align: left;
}
.el-input {
  width: 50px;
}
#lf-container {
  width: 100%;
  height: calc(100vh - 180px);
  outline: none;
}
</style>
