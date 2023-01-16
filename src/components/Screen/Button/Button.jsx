import React from 'react'

function Button({Button_name}) {
    return (
        <>
 <button class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 shadow-xl  px-5 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {Button_name}
                        </button>

        </>
    )
}

export default Button