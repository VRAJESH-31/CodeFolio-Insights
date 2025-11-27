import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ReactApexChart = ({ options, series, type, width, height }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && !chartInstance.current && typeof ApexCharts !== 'undefined') {
            const newOptions = {
                ...options,
                chart: { ...options.chart, type, width, height },
                series,
            };
            chartInstance.current = new ApexCharts(chartRef.current, newOptions);
            chartInstance.current.render();
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.updateOptions(options);
            chartInstance.current.updateSeries(series);
        }
    }, [options, series]);

    return <div ref={chartRef} />;
};

export default ReactApexChart;
