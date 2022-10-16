import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SvgLineAnimation2 } from './SvglineAnimation2';
import './pieChart2.scss';

const circlePath = [
  'M27.3979 109.4C29.4974 109.824 30.8819 111.825 30.6355 113.952C30.2158 117.577 30 121.263 30 125C30 126.465 28.8492 127.686 27.3844 127.727L3.53711 128.393C1.6103 128.447 0 126.928 0 125C0 119.341 0.375983 113.771 1.10433 108.312C1.40336 106.07 3.55583 104.593 5.7724 105.04L27.3979 109.4Z',
  'M33.3927 87.8374C35.3454 88.7232 36.2435 90.9883 35.5216 93.0073C34.4371 96.0401 33.5024 99.1442 32.7265 102.311C32.2003 104.458 30.0981 105.864 27.9309 105.427L6.35926 101.078C4.19533 100.642 2.78742 98.5329 3.29082 96.3835C4.5356 91.0688 6.11951 85.8845 8.01848 80.8549C8.81629 78.7419 11.2434 77.7901 13.3003 78.7231L33.3927 87.8374Z',
  'M44.1123 68.1919C45.8163 69.4947 46.1815 71.9051 45.0219 73.7096C43.2745 76.4286 41.6621 79.2425 40.1939 82.1419C39.1963 84.112 36.8343 85.0063 34.8233 84.0941L14.7816 75.0027C12.7689 74.0897 11.8721 71.7143 12.8506 69.7326C15.2557 64.8615 17.9688 60.1696 20.9645 55.6825C22.2182 53.8045 24.7963 53.4237 26.5901 54.7952L44.1123 68.1919Z',
  'M58.9721 51.4613C60.3382 53.1126 60.1535 55.5409 58.6204 57.0385C56.3025 59.3028 54.1 61.6847 52.0225 64.1746C50.6079 65.8699 48.1054 66.2097 46.3514 64.8686L28.873 51.5054C27.1171 50.1629 26.7779 47.6464 28.1769 45.9352C31.6028 41.7448 35.2954 37.781 39.2287 34.0695C40.8723 32.5185 43.4729 32.726 44.9134 34.4673L58.9721 51.4613Z',
  'M79.3278 37.3362C80.2399 39.2746 79.458 41.5798 77.6023 42.6502C74.1151 44.6617 70.7676 46.8883 67.578 49.3119C65.8184 50.6489 63.3007 50.4184 61.892 48.7156L47.8681 31.7636C46.4605 30.0621 46.6941 27.5364 48.4388 26.1827C53.5051 22.2518 58.8817 18.7019 64.5257 15.576C66.5033 14.4808 68.9716 15.3283 69.9341 17.3737L79.3278 37.3362Z',
  'M102.562 28.7237C102.964 30.8307 101.63 32.8709 99.5627 33.4439C95.6678 34.5237 91.8735 35.8453 88.197 37.3916C86.1597 38.2485 83.7782 37.3993 82.8371 35.3994L73.467 15.4868C72.5268 13.4889 73.3809 11.1008 75.4074 10.2239C81.2673 7.68857 87.3596 5.58881 93.6435 3.96551C95.8296 3.40079 98.0052 4.83536 98.4283 7.05319L102.562 28.7237Z',
  'M128.611 3.90391C128.743 1.80057 127.108 0 125 0C118.373 0 111.867 0.515686 105.519 1.50912C103.334 1.85095 101.909 3.95351 102.323 6.12523L106.447 27.7409C106.86 29.9092 108.951 31.3238 111.136 31.0044C115.661 30.3427 120.291 30 125 30C126.1 30 127.022 29.1539 127.091 28.0561L128.611 3.90391Z',
  'M151.718 29.8254C151.056 31.8633 148.907 33.0084 146.821 32.5181C142.952 31.6086 138.991 30.9356 134.955 30.5154C132.756 30.2864 131.078 28.3946 131.217 26.1883L132.598 4.23073C132.737 2.02743 134.635 0.346381 136.833 0.55277C143.321 1.16197 149.664 2.26701 155.826 3.8296C158.016 4.3852 159.235 6.69227 158.536 8.84168L151.718 29.8254Z',
  'M174.546 39.4622C173.397 41.2734 171.028 41.8472 169.129 40.8494C165.592 38.991 161.924 37.3491 158.142 35.9412C156.072 35.1703 154.918 32.9215 155.601 30.8202L162.402 9.88927C163.084 7.78856 165.343 6.63249 167.421 7.382C173.512 9.57913 179.383 12.2359 184.992 15.3105C186.972 16.3957 187.576 18.9307 186.366 20.837L174.546 39.4622Z',
  'M194.248 54.4844C192.685 55.9519 190.25 55.9195 188.659 54.4825C185.683 51.7943 182.536 49.2918 179.236 46.9933C177.425 45.7315 176.868 43.2685 178.051 41.4045L189.841 22.8261C191.026 20.9596 193.504 20.4025 195.33 21.6478C200.652 25.2759 205.678 29.3041 210.367 33.6893C212.017 35.2326 211.972 37.8402 210.325 39.3868L194.248 54.4844Z',
  'M209.618 73.9163C207.741 74.9483 205.391 74.3129 204.206 72.5281C201.982 69.1767 199.55 65.9747 196.93 62.9402C195.486 61.268 195.558 58.7416 197.169 57.2291L213.206 42.169C214.816 40.6569 217.352 40.732 218.813 42.3891C223.056 47.2038 226.934 52.3476 230.404 57.7774C231.622 59.6824 230.931 62.1994 228.95 63.2886L209.618 73.9163Z',
  'M219.679 96.5608C217.602 97.094 215.483 95.8914 214.781 93.8655C213.458 90.0512 211.899 86.3473 210.122 82.7713C209.138 80.7918 209.836 78.3611 211.773 77.2961L231.057 66.6949C232.991 65.6313 235.428 66.3334 236.431 68.3002C239.335 73.9961 241.815 79.9442 243.83 86.103C244.532 88.2496 243.237 90.5122 241.049 91.0739L219.679 96.5608Z',
  'M223.964 122.236C221.755 122.297 219.923 120.555 219.771 118.35C219.463 113.896 218.848 109.525 217.947 105.261C217.49 103.101 218.77 100.924 220.909 100.375L242.225 94.9017C244.366 94.3521 246.553 95.6416 247.032 97.7993C248.453 104.201 249.382 110.786 249.78 117.516C249.91 119.72 248.163 121.56 245.956 121.621L223.964 122.236Z',
  'M222.061 144.571C219.897 144.135 218.504 142.029 218.846 139.848C219.344 136.675 219.685 133.451 219.861 130.182C219.976 128.041 221.682 126.301 223.825 126.241L245.871 125.625C248.129 125.562 249.998 127.381 249.916 129.639C249.716 135.114 249.164 140.5 248.282 145.774C247.917 147.954 245.8 149.357 243.632 148.92L222.061 144.571Z',
  'M215.181 165.908C213.168 164.995 212.286 162.626 213.114 160.577C214.322 157.588 215.382 154.525 216.285 151.394C216.88 149.334 218.934 148.021 221.037 148.445L242.663 152.806C244.876 153.252 246.288 155.443 245.7 157.623C244.28 162.889 242.525 168.018 240.458 172.985C239.61 175.024 237.234 175.912 235.223 174.999L215.181 165.908Z',
  'M203.653 185.135C201.897 183.793 201.571 181.285 202.839 179.475C204.696 176.827 206.421 174.081 208.005 171.244C209.049 169.373 211.343 168.559 213.294 169.444L233.386 178.558C235.445 179.492 236.327 181.948 235.259 183.941C232.695 188.727 229.829 193.326 226.686 197.714C225.4 199.509 222.886 199.839 221.132 198.498L203.653 185.135Z',
  'M188.105 201.281C186.698 199.58 186.941 197.066 188.582 195.587C190.989 193.417 193.286 191.125 195.461 188.722C196.898 187.133 199.317 186.855 201.02 188.157L218.542 201.553C220.337 202.926 220.644 205.517 219.157 207.219C215.596 211.293 211.776 215.134 207.721 218.715C206.065 220.178 203.538 219.936 202.129 218.233L188.105 201.281Z',
  'M167.161 214.596C166.22 212.598 167.081 210.224 169.037 209.199C172.605 207.329 176.039 205.239 179.321 202.947C181.08 201.72 183.502 201.992 184.869 203.645L198.928 220.639C200.367 222.379 200.086 224.97 198.257 226.295C193.067 230.055 187.576 233.426 181.828 236.365C179.86 237.372 177.472 236.508 176.531 234.508L167.161 214.596Z',
  'M143.555 222.268C143.141 220.096 144.569 218.009 146.722 217.505C150.661 216.584 154.505 215.418 158.239 214.023C160.247 213.273 162.525 214.139 163.438 216.079L172.832 236.042C173.793 238.086 172.876 240.526 170.774 241.353C164.838 243.69 158.68 245.587 152.34 247.001C150.186 247.482 148.092 246.052 147.678 243.884L143.555 222.268Z',
  'M118.784 223.804C118.922 221.601 120.82 219.935 123.027 219.98C123.683 219.993 124.341 220 125 220C128.397 220 131.753 219.822 135.059 219.474C137.188 219.25 139.175 220.655 139.576 222.759L143.71 244.428C144.134 246.65 142.634 248.786 140.39 249.062C135.346 249.681 130.21 250 125 250C123.712 250 122.429 249.981 121.15 249.942C118.941 249.875 117.263 247.968 117.402 245.762L118.784 223.804Z',
  'M94.3996 219.178C95.0822 217.077 97.3363 215.936 99.4642 216.529C103.296 217.596 107.226 218.428 111.238 219.01C113.361 219.319 114.941 221.176 114.806 223.317L113.422 245.33C113.28 247.583 111.302 249.278 109.062 248.994C102.604 248.172 96.2989 246.857 90.1869 245.088C88.0645 244.474 86.916 242.21 87.5988 240.109L94.3996 219.178Z',
  'M71.9447 208.602C73.1292 206.735 75.599 206.191 77.5127 207.298C80.9737 209.299 84.5726 211.089 88.2918 212.648C90.2685 213.477 91.3346 215.667 90.6723 217.706L83.8542 238.689C83.156 240.838 80.8153 241.988 78.7166 241.152C72.707 238.755 66.927 235.905 61.4189 232.645C59.5191 231.52 58.9715 229.044 60.1544 227.18L71.9447 208.602Z',
  'M52.8325 192.77C54.4426 191.258 56.9678 191.344 58.5462 192.889C61.4134 195.696 64.4577 198.323 67.6607 200.751C69.3679 202.045 69.8546 204.43 68.7067 206.239L56.8871 224.864C55.6758 226.772 53.1205 227.304 51.2956 225.969C46.0996 222.17 41.2079 217.979 36.6638 213.441C35.1006 211.879 35.1845 209.342 36.7951 207.83L52.8325 192.77Z',
  'M38.2333 172.7C40.168 171.637 42.5912 172.347 43.737 174.234C45.8256 177.674 48.1265 180.971 50.6215 184.106C51.9566 185.784 51.8364 188.218 50.2732 189.686L34.1958 204.784C32.5493 206.33 29.9449 206.211 28.508 204.468C24.4273 199.519 20.72 194.25 17.4291 188.705C16.3009 186.805 17.0126 184.367 18.9497 183.302L38.2333 172.7Z',
  'M29.0853 149.627C31.2261 149.077 33.3986 150.371 34.0371 152.487C35.2043 156.355 36.6114 160.118 38.2411 163.76C39.1171 165.718 38.3955 168.047 36.516 169.08L17.1837 179.708C15.205 180.796 12.7126 180.034 11.7543 177.989C9.04271 172.204 6.76136 166.177 4.95144 159.949C4.33522 157.829 5.63084 155.649 7.76949 155.1L29.0853 149.627Z',
  'M26.3916 131.756C28.536 131.696 30.3368 133.34 30.5706 135.472C30.7734 137.322 31.0294 139.156 31.3368 140.972C31.6944 143.084 30.4166 145.155 28.3418 145.688L6.97247 151.175C4.78272 151.737 2.55617 150.375 2.14 148.153C1.42966 144.36 0.890627 140.507 0.531223 136.601C0.324305 134.353 2.08822 132.435 4.34519 132.372L26.3916 131.756Z'
];

interface PieChart2Props {
  value: number
  color: string
  lightColor: string
}

export const PieChart2 = ({
  value = 45.83,
  color = '#04A5BA',
  lightColor = '#67d5e2'
}: PieChart2Props) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [keyName, setKeyName] = useState('a');

  const init = () => {
    if (value === 0) return (setCurrentIndex(-1));
    setCurrentIndex(Math.floor((value / 100) * 26));
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setKeyName(uuidv4());
    init();
  }, [value]);
  return (
      <div className="pie-chart2-wrapper">
          <div className="pie-chart2">
              <div className="pie-chart2-top"></div>
              <div className="pie-chart2-percente">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                  key={keyName}
                  width="100%"
                  height="100%"
                  viewBox="0 0 250 250"
                  fill="none"
                >
                    {
                        circlePath.map((item, index) => {
                          return (
                                <path key={index} d={item} fill="#0b3265">
                                    {
                                        index === 0 && currentIndex > -1 &&
                                        < animate
                                            id={`pieChartPercenteP${index}`}
                                            attributeName="fill"
                                            attributeType="XML"
                                            begin="0s"
                                            dur="0.1s"
                                            from={color}
                                            to={lightColor}
                                            fill="freeze"
                                        />
                                    }
                                    {
                                        index > 0 && index < currentIndex &&
                                        <animate
                                            id={`pieChartPercenteP${index}`}
                                            attributeName="fill"
                                            attributeType="XML"
                                            begin={`pieChartPercenteP${index - 1}.end`}
                                            dur="0.1s"
                                            from={color}
                                            to={lightColor}
                                            fill="freeze"
                                        />
                                    }
                                </path>
                          );
                        })
                    }
                    <circle cx="125" cy="125" r="61.5" fill="url(#paint0_linear_2_257)" stroke="url(#paint1_linear_2_258)" />
                    <defs>
                        <linearGradient id="paint0_linear_2_257" x1="125" y1="80" x2="125" y2="170" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0B3265" stopOpacity="1" />
                            <stop offset="1" stopColor="#0B3265" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_2_258" x1="125" y1="80" x2="125" y2="170" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1B5196" stopOpacity="1" />
                            <stop offset="1" stopColor="#1B5196" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
              </div>
              <div className="pie-svgline-wrap">
                  <SvgLineAnimation2
                      className="pie-svgline"
                      width={250}
                      height={250}
                      duration={5}
                      length={50}
                      color="#00F7FF"
                      path="M113,0C50.59,0 0,50.59 0,113C0,175.41 50.59,226 113,226C175.41,226 226,175.41 226,113C226,50.59 175.41,0 113,0Z"
                  />
                  <SvgLineAnimation2
                      className="pie-svgline"
                      width={250}
                      height={250}
                      duration={5}
                      length={50}
                      begin={-1.5}
                      color="#00F7FF"
                      path="M113,0C50.59,0 0,50.59 0,113C0,175.41 50.59,226 113,226C175.41,226 226,175.41 226,113C226,50.59 175.41,0 113,0Z"
                  />
                  <SvgLineAnimation2
                      className="pie-svgline"
                      width={250}
                      height={250}
                      duration={5}
                      length={50}
                      begin={-3}
                      color="#00F7FF"
                      path="M113,0C50.59,0 0,50.59 0,113C0,175.41 50.59,226 113,226C175.41,226 226,175.41 226,113C226,50.59 175.41,0 113,0Z"
                  />
              </div>
              <div className="pie-chart2-container" style={{ color }}>
                  <div className="pie-chart2-value">
                      {value}%
                  </div>
              </div>
          </div>
      </div>
  );
};