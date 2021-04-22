import React from 'react'
import { View, Text } from 'react-native';
import { ILFileText } from '../../../assets/';
import { CollapsibleView } from '../index'


const DropDown = ({children, title, icon}) => {
  if(icon === false){
    return (
      <CollapsibleView
      title={
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
              <Text style={{fontFamily: 'DMSans-Bold', fontSize: 14, flex: 1, marginLeft: 14}} >{title}</Text>
          </View>
      }
      isRTL
      style={{borderWidth: 0,padding: 20, backgroundColor: '#FFFF', borderRadius: 10}}
  >
      {children}
     </CollapsibleView>
    )
  }

  return (
    <CollapsibleView
        title={
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <ILFileText/>
                <Text style={{fontFamily: 'DMSans-Bold', fontSize: 14, flex: 1, marginLeft: 14}} >{title}</Text>
            </View>
        }
        isRTL
        style={{borderWidth: 0,padding: 20, backgroundColor: '#FFFF', borderRadius: 10}}
    >
        {children}
    </CollapsibleView>
  )
}

export default DropDown
