// Vue.js
        // Goal kings : 'https://template.maytap.me/service/5b8e7a736e02d93b4ffe456d?data.league=spor-toto-super-lig
        // Standings : 'https://next.maytap.me/api/cache/igen/5e79d7bc036c8b522395004e?json'
        // Results : https://template.maytap.me/service/5b8e77c76e02d93b4ffe4518?data.league=spor-toto-super-lig
        // Formula 1 : https://template.maytap.me/service/5bbdd4cdc540b02e8ec6910b

        var app = new Vue({
            el:"#app", // element
            data: {
                prevlg: null,
                prevjs: null,
                lg: 'super-toto-super-lig',
                gcont:false,
                tcont:false,
                rcont:false,
                gkings: [],
                teams: [],
                res: []
            },
            methods: {
                goals(e){
                    this.tcont=false;
                    this.teams=[];
                    this.rcont=false;
                    this.res=[];

                    fetch('https://template.maytap.me/service/5b8e7a736e02d93b4ffe456d?data.league='+e,{
                        method:'GET',
                        headers: new Headers ({
                            'content-type': 'application/json',
                            'authorization': 'apikey 2zkCIcZfeYT2LaDZbXm2y4:0xGpT8tlCIkIR7Y8Ku4JTj',
                        }),
                    })
                    .then(Response => Response.json())
                    .then(Response => {
                        if(this.gkings.length!=0 && e!=this.prevlg)
                        {
                            this.gkings=[];     
                        }
                        if(this.gkings.length==0)
                        {
                            this.prevlg=e;
                            for(var i=0; i<Response.result.length; i++){
                                this.gkings.push(Response.result[i])
                            }
                            this.gcont=true;
                            this.tcont=false;        
                        }
                    });
                },
                standings(e){
                    this.gcont=false;
                    this.gkings=[];
                    this.rcont=false;
                    this.res=[];


                    fetch('https://template.maytap.me/service/5cc04a3442129925a40f2531?data.league='+e)
                    .then(Response => Response.json())
                    .then(Response => {
                        if(this.teams.length!=0 && e!=this.prevlg)
                        {
                            this.teams=[];     
                        }
                        if(this.teams.length==0)
                        {
                            fetch(Response.result.json)
                            .then(Res => Res.json())
                            .then(Res =>{
                                this.prevlg=e;
                                for(var i=0; i<Res.data.values.length; i++){
                                    this.teams.push(Res.data.values[i]);
                                }
                            });     
                        }
                        this.gcont=false;
                        this.tcont=true; 
                    });
                },
                results(e){
                    this.tcont=false;
                    this.teams=[];
                    this.gcont=false;
                    this.gkings=[];

                    fetch('https://template.maytap.me/service/5b8e77c76e02d93b4ffe4518?data.league='+e,{
                        method:'GET',
                        headers: new Headers ({
                            'content-type': 'application/json',
                            'authorization': 'apikey 2zkCIcZfeYT2LaDZbXm2y4:0xGpT8tlCIkIR7Y8Ku4JTj',
                        }),
                    })
                    .then(Response => Response.json())
                    .then(Response => {
                        if(this.res.length!=0 && e!=this.prevlg)
                        {
                            this.res=[];     
                        }
                        if(this.res.length==0)
                        {
                            this.prevlg=e;
                            for(var i=0; i<Response.result.length; i++){
                                this.res.push(Response.result[i])
                            }
                            this.gcont=false;
                            this.tcont=false;
                            this.rcont=true;        
                        }
                    });
                },

            },
        });