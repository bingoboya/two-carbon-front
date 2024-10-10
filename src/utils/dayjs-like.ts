// src/utils/dateUtils.ts

class TSDate {
  private date: Date;

  constructor(date?: Date | string | number) {
    this.date = date ? new Date(date) : new Date();
  }

  format(template: string): string {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    const seconds = this.date.getSeconds();

    return template
      .replace('YYYY', year.toString().padStart(4, '0'))
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('hh', hours.toString().padStart(2, '0'))
      .replace('mm', minutes.toString().padStart(2, '0'))
      .replace('ss', seconds.toString().padStart(2, '0'));
  }

  day(): number {
    return this.date.getDay();
  }
}

function tsDate(date?: Date | string | number): TSDate {
  return new TSDate(date);
}

/**
 * 返回当前日期是星期几（0-6，0表示星期日）
 * @returns {number} 0-6之间的数字，表示星期几
 */
export function day(): number {
  return new Date().getDay();
}

// 如果将来需要，可以取消注释并导出以下函数
export function format(template: string): string {
  return tsDate().format(template);
}

// 内部使用的辅助函数，用于测试或将来可能的扩展
function _tsDate(date?: Date | string | number): TSDate {
  return tsDate(date);
}

// 仅用于内部测试，不导出
function _test() {
  console.log(_tsDate().format("YYYY-MM-DD hh:mm:ss"));
  console.log(day());
}
