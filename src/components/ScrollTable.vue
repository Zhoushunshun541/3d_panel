<template>
  <div class="scroll-table">
    <span>单位:万件</span>
    <!-- 表头 -->
    <table class="mt5">
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <thead>
        <tr>
          <td class="dept">部门</td>
          <td class="table-row-cell_1">成衣库存</td>
          <td class="table-row-cell_2">面料库存</td>
          <td class="table-row-cell_3">理赔费</td>
          <td class="table-row-cell_4">延误费</td>
          <td class="table-row-cell_5">合计损失</td>
          <td class="pd0 w80">合计占销售比相较去年</td>
          <td class="pd0 w60">今年累计相较去年</td>
        </tr>
      </thead>
    </table>
    <!-- 表内容 -->
    <table class="table-content">
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <tbody :class="{ anim: animate == true }">
        <tr v-for="(item, i) in tableData" :key="i">
          <td class="dept">{{ item.name }}</td>
          <td class="table-row-cell_1">{{ item.checkNum }}</td>
          <td class="table-row-cell_2">{{ item.badNum }}</td>
          <td class="table-row-cell_3">{{ item.monthBadPct }}</td>
          <td class="table-row-cell_4">{{ item.yearBadPct }}</td>
          <td class="table-row-cell_5">{{ item.yearBadPct }}</td>
          <td class="pd0 w80">{{ item.yearBadPct }}</td>
          <td class="pd0 w60">{{ item.yearBadPct }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 表尾 -->
    <table>
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <tfoot>
        <tr class="total">
          <td class="dept">合计</td>
          <td class="table-row-cell_1">1</td>
          <td class="table-row-cell_2">1</td>
          <td class="table-row-cell_3">1</td>
          <td class="table-row-cell_4">1</td>
          <td class="table-row-cell_5">1</td>
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
          name: '无锡工厂1',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂2',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂3',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂4',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂5',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂6',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂7',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂8',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
        {
          name: '无锡工厂9',
          checkNum: 0,
          badNum: 0,
          monthBadPct: 20,
          yearBadPct: 20,
        },
      ],
    },
  },
  data() {
    return {
      tableData: [],
      animate: false,
    };
  },
  methods: {
    scrollTable() {
      setTimeout(() => {
        this.animate = true;
        this.tableData.push(this.tableData[0]);
        this.tableData.shift();
        // this.animate = false;
        // this.scrollTable();
      }, 2000);
    },
  },
  mounted() {
    this.tableData = JSON.parse(JSON.stringify(this.list));
    this.scrollTable();
  },
};
</script>

<style lang="less" scoped>
.scroll-table {
  font-size: 14px;
  color: rgba(207, 220, 255, 0.6);
  .table-content {
    display: block;
    height: 176px;
    overflow: scroll;
  }
  thead {
    text-align: center;
    color: rgba(207, 220, 255, 0.6);
    tr {
      height: 50px;
    }
    td {
      padding: 13px 3px 16px;
    }
  }
  .anim {
    transition: all 2s;
    margin-top: -25px;
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
