# Resultado Teste de carga: `/creator`

## Sem cluster
$ npm run cannon:creators

desafio-v-prova-1@1.0.0 cannon:creators
npx autocannon -c 500 -d 20 -w 10 --renderStatusCodes --latency --warmup [ -c 1 -d 2 ] localhost:3000/creator

Running 2s warmup @ http://localhost:3000/creator
1 connections
10 workers

Running 20s test @ http://localhost:3000/creator
500 connections
10 workers

┌─────────┬────────┬────────┬──────────┬──────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%    │ 99%      │ Avg        │ Stdev      │ Max      │
├─────────┼────────┼────────┼──────────┼──────────┼────────────┼────────────┼──────────┤
│ Latency │ 270 ms │ 445 ms │ 14958 ms │ 17056 ms │ 2101.79 ms │ 3927.65 ms │ 19869 ms │
└─────────┴────────┴────────┴──────────┴──────────┴────────────┴────────────┴──────────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 970    │ 970    │ 1.138   │ 1.188   │ 1.138,2 │ 47,35  │ 970     │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 4.4 MB │ 4.4 MB │ 5.15 MB │ 5.38 MB │ 5.15 MB │ 214 kB │ 4.39 MB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴────────┴─────────┘
┌──────┬───────┐
│ Code │ Count │
├──────┼───────┤
│ 200  │ 22764 │
└──────┴───────┘

Req/Bytes counts sampled once per second.
nº of samples: 200

┌────────────┬──────────────┐
│ Percentile │ Latency (ms) │
├────────────┼──────────────┤
│ 0.001      │ 58           │
├────────────┼──────────────┤
│ 0.01       │ 59           │
├────────────┼──────────────┤
│ 0.1        │ 90           │
├────────────┼──────────────┤
│ 1          │ 212          │
├────────────┼──────────────┤
│ 2.5        │ 270          │
├────────────┼──────────────┤
│ 10         │ 374          │
├────────────┼──────────────┤
│ 25         │ 406          │
├────────────┼──────────────┤
│ 50         │ 445          │
├────────────┼──────────────┤
│ 75         │ 1262         │
├────────────┼──────────────┤
│ 90         │ 7872         │
├────────────┼──────────────┤
│ 97.5       │ 14958        │
├────────────┼──────────────┤
│ 99         │ 17056        │
├────────────┼──────────────┤
│ 99.9       │ 19641        │
├────────────┼──────────────┤
│ 99.99      │ 19845        │
├────────────┼──────────────┤
│ 99.999     │ 19869        │
└────────────┴──────────────┘

28k requests in 20.1s, 103 MB read
5k errors (0 timeouts)

## Com cluster

$ npm run cannon:creators

desafio-v-prova-1@1.0.0 cannon:creators
npx autocannon -c 500 -d 20 -w 10 --renderStatusCodes --latency --warmup [ -c 1 -d 2 ] localhost:3000/creator

Running 2s warmup @ http://localhost:3000/creator
1 connections
10 workers

Running 20s test @ http://localhost:3000/creator
500 connections
10 workers

┌─────────┬───────┬───────┬────────┬────────┬──────────┬───────────┬─────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev     │ Max     │
├─────────┼───────┼───────┼────────┼────────┼──────────┼───────────┼─────────┤
│ Latency │ 43 ms │ 71 ms │ 217 ms │ 277 ms │ 93.37 ms │ 147.72 ms │ 4811 ms │
└─────────┴───────┴───────┴────────┴────────┴──────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬───────┬──────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5% │ Avg      │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼───────┼──────────┼─────────┼─────────┤
│ Req/Sec   │ 3.217   │ 3.217   │ 6.295   │ 7.067 │ 5.938,75 │ 1.078,8 │ 3.216   │
├───────────┼─────────┼─────────┼─────────┼───────┼──────────┼─────────┼─────────┤
│ Bytes/Sec │ 14.6 MB │ 14.6 MB │ 28.5 MB │ 32 MB │ 26.9 MB  │ 4.88 MB │ 14.6 MB │
└───────────┴─────────┴─────────┴─────────┴───────┴──────────┴─────────┴─────────┘
┌──────┬────────┐
│ Code │ Count  │
├──────┼────────┤
│ 200  │ 118766 │
└──────┴────────┘

Req/Bytes counts sampled once per second.
nº of samples: 200

┌────────────┬──────────────┐
│ Percentile │ Latency (ms) │
├────────────┼──────────────┤
│ 0.001      │ 13           │
├────────────┼──────────────┤
│ 0.01       │ 23           │
├────────────┼──────────────┤
│ 0.1        │ 31           │
├────────────┼──────────────┤
│ 1          │ 39           │
├────────────┼──────────────┤
│ 2.5        │ 43           │
├────────────┼──────────────┤
│ 10         │ 49           │
├────────────┼──────────────┤
│ 25         │ 57           │
├────────────┼──────────────┤
│ 50         │ 71           │
├────────────┼──────────────┤
│ 75         │ 99           │
├────────────┼──────────────┤
│ 90         │ 148          │
├────────────┼──────────────┤
│ 97.5       │ 217          │
├────────────┼──────────────┤
│ 99         │ 277          │
├────────────┼──────────────┤
│ 99.9       │ 2931         │
├────────────┼──────────────┤
│ 99.99      │ 4098         │
├────────────┼──────────────┤
│ 99.999     │ 4710         │
└────────────┴──────────────┘

119k requests in 20.05s, 538 MB read
61 errors (0 timeouts)