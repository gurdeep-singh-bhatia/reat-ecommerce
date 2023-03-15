const ProductReducer = (state,action) => {


    switch (action.type) {

        case ("SET_LOADING"):
            return { 
                ...state,
                isLoading : true,
            };


        case("SET_API_DATA"):
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
                
            })

            return{
                ...state,
                isLoading : false,
                products : action.payload,
                featureProducts : featureData,
            }
        
        case("API_ERROR"):
            return{
                ...state,
                isError : true,
                isLoading : false,
            } ;
        
        case ("SET_SINGLE_LOADING"):
                return { 
                    ...state,
                    isSingleLoading : true,
                };
    
    
        case("SET_SINGLE_PRODUCT"):
            return { 
                ...state,
                isSingleLoading : false,
                singleProduct : action.payload
            };

        case("API_SINGLE_ERROR"):
            return{
                ...state,
                isError : true,
                isSingleLoading : false,
            } ;
        
        

        default:
            return state
    }


};

export default ProductReducer