const Company = [
    {
        img : '/comp1.png'
    },{
        img : '/comp2.png'
    },{
        img : '/comp3.png'
    },{
        img : '/comp4.png'
    },{
        img : '/comp5.png'
    },{
        img : '/comp6.png'
    },{
        img : '/comp7.png'
    }
]


const Companies = () => {
  return (
    <div className="lg:mx-20 sm:mx-10 mx-3 my-3 lg:my-10">
        <div className="flex items-center flex-wrap gap-3 justify-center lg:justify-around">
           {Company.map((comp)=>{
            return(
                <div key={comp.img}>
                    <img src={comp.img} alt="" className="md:h-auto h-[120px] max-[500px]:h-[70px]"/>
                </div>
            )
           })}
        </div>
    </div>
  )
}

export default Companies