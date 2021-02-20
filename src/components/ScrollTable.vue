<template>
  <div class="scroll-table">
    <span>单位:万件</span>
    <table class="mt5">
      <thead>
        <tr>
          <td class="dept">部门</td>
          <td>成衣库存</td>
          <td>面料库存</td>
          <td>理赔费</td>
          <td>延误费</td>
          <td>合计损失</td>
          <td class="pd0 w80">合计占销售比相较去年</td>
          <td class="pd0 w60">今年累计相较去年</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td class="dept">{{ item.name }}</td>
          <td>{{ item.checkNum }}</td>
          <td>{{ item.badNum }}</td>
          <td>{{ item.monthBadPct }}</td>
          <td>{{ item.yearBadPct }}</td>
          <td>{{ item.yearBadPct }}</td>
          <td class="pd0 w80">{{ item.yearBadPct }}</td>
          <td class="pd0 w60">{{ item.yearBadPct }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="total">
          <td class="dept">合计</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td class="pd0 w80">1</td>
          <td class="pd0 w60">1</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ScrollTable',
  props: {
    list: {
      type: Array,
      default: () => [
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
      ],
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-table {
  font-size: 14px;
  color: rgba(207, 220, 255, 0.6);
  thead {
    text-align: center;
    color: rgba(207, 220, 255, 0.6);
    tr {
      height: 50px;
    }
    td {
      padding: 13px 5px 16px;
    }
  }
  tbody {
    color: #cfdcff;
    text-align: center;
    height: 181px;
    padding-bottom: 45px;
    tr {
      display: table-row;
    }
    td {
      height: 25px;
    }
  }
  .total {
    text-align: center;
    color: rgba(207, 220, 255, 1);
    td {
      height: 45px;
      font-weight: 600;
    }
    .dept {
      font-weight: 400;
      color: rgba(207, 220, 255, 0.6);
    }
  }
  .dept {
    width: 80px;
  }
  .w80 {
    width: 80px;
  }
  .w60 {
    width: 60px;
  }
  .pd0 {
    padding: 0;
  }
  td {
    border-left: 1px dotted;
    border-right: 1px dotted;
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
