"use strict";(self.webpackChunkcommerce_php=self.webpackChunkcommerce_php||[]).push([[54088],{78305:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return l},default:function(){return p}});var s=t(87462),i=t(63366),o=(t(15007),t(64983)),a=t(91515),r=["components"],l={},d={_frontmatter:l},c=a.Z;function p(e){var n=e.components,t=(0,i.Z)(e,r);return(0,o.mdx)(c,(0,s.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"add-custom-fields-that-incluence-other-checkout-fields"},"Add custom fields that incluence other checkout fields"),(0,o.mdx)("p",null,"This topic describes how to add a custom field that influences other fields on the checkout page."),(0,o.mdx)("p",null,"Let's consider a case where you need to add a checkbox whose state (selected or cleared) changes the state of other fields: when the checkbox is selected, the Shipping Address fields get prepopulated with a certain address."),(0,o.mdx)("p",null,"To implement such a checkbox, take the following steps:"),(0,o.mdx)("ol",null,(0,o.mdx)("li",{parentName:"ol"},(0,o.mdx)("a",{parentName:"li",href:"#step-1-create-a-plugin-for-the-layoutprocessors-process-method"},"Create a plugin for the process method")," of the ",(0,o.mdx)("inlineCode",{parentName:"li"},"<Magento_Checkout_module_dir>/Block/Checkout/LayoutProcessor.php")," class."),(0,o.mdx)("li",{parentName:"ol"},(0,o.mdx)("a",{parentName:"li",href:"#step-2-declare-plugin-in-dixml"},"Declare the plugin in your module's ",(0,o.mdx)("inlineCode",{parentName:"a"},"di.xml")),"."),(0,o.mdx)("li",{parentName:"ol"},(0,o.mdx)("a",{parentName:"li",href:"#step-3-create-a-js-component-for-the-checkbox"},"Create a JS component for the checkbox with custom logic"),".")),(0,o.mdx)("h2",{id:"step-1-create-a-plugin-for-the-layoutprocessors-process-method"},"Step 1: Create a plugin for the ",(0,o.mdx)("inlineCode",{parentName:"h2"},"LayoutProcessor"),"'s process method"),(0,o.mdx)("p",null,"In your custom module directory, create the following new file: ",(0,o.mdx)("inlineCode",{parentName:"p"},"<your_module_dir>/Block/Checkout/SomeProcessor.php"),". In this file, add the following code sample. This is a plugin that adds a checkbox, makes the street labels trackable, and assigns dependencies to the checkbox."),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-php?start_inline=1"},"namespace Magento\\Checkout\\Block\\Checkout;\n\nclass SomeProcessor\n{\n    /**\n     * Checkout LayoutProcessor after process plugin.\n     *\n     * @param \\Magento\\Checkout\\Block\\Checkout\\LayoutProcessor $processor\n     * @param array $jsLayout\n     * @return array\n     */\n    public function afterProcess(\\Magento\\Checkout\\Block\\Checkout\\LayoutProcessor $processor, $jsLayout)\n    {\n        $shippingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']\n            ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'];\n        $billingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']\n        ['children']['payment']['children']['payments-list']['children'];\n\n        //Checks if shipping step available.\n        if (isset($shippingConfiguration)) {\n            $shippingConfiguration = $this->processAddress(\n                $shippingConfiguration,\n                'shippingAddress',\n                [\n                    'checkoutProvider',\n                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.street',\n                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.city',\n                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.country_id'\n                ]\n            );\n        }\n\n        //Checks if billing step available.\n        if (isset($billingConfiguration)) {\n            //Iterate over billing forms.\n            foreach($billingConfiguration as $key => &$billingForm) {\n                //Exclude not billing forms\n                if (!strpos($key, '-form')) {\n                    continue;\n                }\n\n                $billingForm['children']['form-fields']['children'] = $this->processAddress(\n                    $billingForm['children']['form-fields']['children'],\n                    $billingForm['dataScopePrefix'],\n                    [\n                        'checkoutProvider',\n                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.street',\n                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.city',\n                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.country_id'\n                    ]\n                );\n            }\n        }\n\n        return $jsLayout;\n    }\n\n    /**\n     * Process provided address to contains checkbox and have trackable address fields.\n     *\n     * @param $addressFieldset - Address fieldset config.\n     * @param $dataScope - data scope\n     * @param $deps - list of dependencies\n     * @return array\n     */\n    private function processAddress($addressFieldset, $dataScope, $deps)\n    {\n        //Creates checkbox.\n        $addressFieldset['custom_checkbox'] = [\n            'component' => 'Magento_Checkout/js/single-checkbox',\n            'config' => [\n                'customScope' => $dataScope,\n                'template' => 'ui/form/field',\n                'prefer' => 'checkbox'\n            ],\n            'dataScope' => $dataScope . '.custom_checkbox',\n            'deps' => $deps,\n            'label' => __('Army Address'),\n            'provider' => 'checkoutProvider',\n            'visible' => true,\n            'initialValue' => false,\n            'sortOrder' => 10,\n            'valueMap' => [\n                'true' => true,\n                'false' => false\n            ]\n        ];\n\n        //Makes each address field label trackable.\n        if (isset($addressFieldset['street']['children'])) {\n            foreach($addressFieldset['street']['children'] as $key => $street) {\n                $street['tracks']['label'] = true;\n                //Remove .additional class. Can be removed, but style fix provided instead.\n                $street['additionalClasses'] = '';\n                $addressFieldset['street']['children'][$key] = $street;\n            }\n        }\n\n        return $addressFieldset;\n    }\n}\n")),(0,o.mdx)("p",null,"For more information on creating plugins, see ",(0,o.mdx)("a",{parentName:"p",href:"../../development/components/plugins.md"},"Plugins (Interceptors)"),"."),(0,o.mdx)("h2",{id:"step-2-declare-plugin-in-dixml"},"Step 2: Declare plugin in di.xml"),(0,o.mdx)("p",null,"In ",(0,o.mdx)("inlineCode",{parentName:"p"},"<your_module_dir>/etc/frontend/di.xml"),", declare the plugin you created on the previous step. The plugin name is arbitrary, in our example it's ",(0,o.mdx)("inlineCode",{parentName:"p"},"ProcessAddressConfiguration"),":"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-xml"},'<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">\n    <type name="Magento\\Checkout\\Block\\Checkout\\LayoutProcessor">\n        <plugin name="ProcessAddressConfiguration" type="Magento\\Checkout\\Block\\Checkout\\SomeProcessor"/>\n    </type>\n</config>\n')),(0,o.mdx)("h2",{id:"step-3-create-a-js-component-for-the-checkbox"},"Step 3: Create a JS component for the checkbox"),(0,o.mdx)("p",null,"In your custom module directory, create the following new file: ",(0,o.mdx)("inlineCode",{parentName:"p"},"<your_module_dir>/view/frontend/web/js/single-checkbox.js"),". In this file, add the following code. This is  a JS component that extends ",(0,o.mdx)("inlineCode",{parentName:"p"},"Magento_Ui/js/form/element/single-checkbox.js"),". The ",(0,o.mdx)("inlineCode",{parentName:"p"},"onCheckedChanged")," method calls the methods that update street labels, change the city and country values, and disable these fields:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-js"},"define([\n    'Magento_Ui/js/form/element/single-checkbox',\n    'mage/translate'\n], function (AbstractField, $t) {\n    'use strict';\n\n    return AbstractField.extend({\n        defaults: {\n            streetLabels: [$t('Company / Section / Unit'), $t('Post Sector Type'), $t('Post Sector')],\n            modules: {\n                street: '${ $.parentName }.street',\n                city: '${ $.parentName }.city',\n                country: '${ $.parentName }.country_id'\n            }\n        },\n\n        updateStreetLabels: function () {\n            if (this.value()) {\n                this.street().elems.each(function (street, key) {\n                    this.street().elems()[key].set('label', this.streetLabels[key]);\n                }.bind(this));\n            } else {\n                this.street().elems.each(function (street, key) {\n                    this.street().elems()[key].set('label', '');\n                }.bind(this));\n            }\n        },\n\n        updateCity: function () {\n            if (this.value()) {\n                this.city().value('Kyiv');\n                this.city().disabled(true);\n            } else {\n                this.city().value('');\n                this.city().disabled(false);\n            }\n        },\n\n        updateCountry: function () {\n            if (this.value()) {\n                this.country().value('UA');\n                this.country().disabled(true);\n            } else {\n                this.country().value('');\n                this.country().disabled(false);\n            }\n        },\n\n        onCheckedChanged: function () {\n            this._super();\n            this.updateStreetLabels();\n            this.updateCity();\n            this.updateCountry();\n        }\n    });\n});\n")),(0,o.mdx)("h2",{id:"step-4-compile-and-deploy-the-static-content"},"Step 4: Compile and deploy the static content"),(0,o.mdx)("ol",null,(0,o.mdx)("li",{parentName:"ol"},(0,o.mdx)("p",{parentName:"li"},"Compile the code:"),(0,o.mdx)("pre",{parentName:"li"},(0,o.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento setup:di:compile\n"))),(0,o.mdx)("li",{parentName:"ol"},(0,o.mdx)("p",{parentName:"li"},"Deploy static content:"),(0,o.mdx)("pre",{parentName:"li"},(0,o.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento setup:static-content:deploy\n")))))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-tutorials-custom-checkout-add-checkbox-md-7bdcd37f9201b1fe2388.js.map