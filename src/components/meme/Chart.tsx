"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function AreaChart() {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartRef.current) return;
		const chart = echarts.init(chartRef.current);

		const data = [1, 132, 101, 134, 90, 230, 210];
		const lastIndex = data.length - 1;
		const lastValue = data[lastIndex];

		const LINE_DURATION = 2000; // 折线绘制时间（ms）

		// 第一步：先画折线
		chart.setOption({
			grid: { left: 16, right: 16, top: 0, bottom: 0 },
			xAxis: { show: false, type: "category", data: data.map((_, i) => i), boundaryGap: false, },
			yAxis: { show: false, type: "value" },
			series: [
				{
					id: "main-line",
					type: "line",
					data,
					smooth: true,
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "rgba(255, 72, 72, 0.10)" },
							{ offset: 1, color: "rgba(255, 72, 72, 0.00)" },
						]),
					},
					lineStyle: { color: "#FF4848", width: 4 },
					showSymbol: false,
					animation: true,
					animationDuration: LINE_DURATION,
					animationEasing: "cubicOut",
				},
			],
		});

		// 第二步：折线画完后再加呼吸灯
		setTimeout(() => {
			chart.setOption({
				series: [
					{
						id: "last-ripple",
						type: "effectScatter",
						coordinateSystem: "cartesian2d",
						data: [[lastIndex, lastValue]],
						symbol: "circle",
						symbolSize: 8,
						itemStyle: { color: "#FF4848" },
						rippleEffect: {
							brushType: "stroke", // 描边光晕
							scale: 4, // 放大倍数
							period: 2, // 呼吸周期（秒）
						},
						showEffectOn: "render",
						zlevel: 1,
						z: 10,
					} as echarts.SeriesOption,
				],
			});
		}, 1600);

		const onResize = () => chart.resize();
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			chart.dispose();
		};
	}, []);

	return <div ref={chartRef} className="px-0 md:px-[16px]" style={{ width: "100%", height: 200 }} />;
}
