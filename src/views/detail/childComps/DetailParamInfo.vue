<template>
  <div class="param-info">
    <table class="info-size" >
      <tr v-for="(tr, indey) in tables[0]" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="(val, key, index) in setinfo">  
        <!-- paramInfo.info.set -->
        <td class="info-param-key">{{key}}</td>
        <td class="param-value">{{val}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  setinfo: {
		    type: Object,
        default() {
		      return {}
        }
      },
      tables: {
        type: Array
      }
    }
	}
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }
</style>
