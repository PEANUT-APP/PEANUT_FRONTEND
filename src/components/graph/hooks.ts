import moment from 'moment';

const bloodSugarList = [
  {'87': '2024-10-08T06:02:00'},
  {'167': '2024-10-08T10:00:00'},
];

// 시간을 기준으로 데이터 포인트를 매핑하는 함수
export function mapBloodSugarToGraph() {
  const graphData: {
    time: number;
    minute: number | null;
    value: number | null;
  }[] = [];

  // 6시부터 23시까지의 시간대를 모두 미리 null 값으로 초기화
  for (let hour = 6; hour <= 24; hour++) {
    graphData.push({
      time: hour,
      minute: 0,
      value: null,
    });
  }

  // 혈당 데이터를 변환
  bloodSugarList?.forEach(item => {
    const bloodSugarValue = parseInt(Object.keys(item)[0], 10); // 혈당 값
    const time = moment(Object.values(item)[0], 'YYYY-MM-DDTHH:mm:ss.SSSSSS'); // 시간 파싱
    const hour = time.hour(); // 시간 (0시 ~ 23시)
    const minute = time.minute();

    // 만약 6시부터 23시 사이의 값이면 해당하는 시간에 값 할당
    if (hour >= 6 && hour <= 24) {
      graphData[hour - 6].value = bloodSugarValue;
      graphData[hour - 6].minute = minute;
    }
  });
  console.log(graphData);

  return graphData;
}
