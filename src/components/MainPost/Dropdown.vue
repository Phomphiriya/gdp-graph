<template>
    <div class="wrapper">
        <div class="main-country">
            {{ currentCountry }}
        </div>
        <fa :icon="['fas', 'exchange-alt']" class="icon" />
        <div class="input-wrapper">
            <input
                class="chosen-value"
                type="text"
                placeholder="Type to filter"
                v-model="selectedCountry"
            />
            <ul class="value-list">
                <li
                    v-for="(i, index) in filterdCountry"
                    :key="i"
                    @click="click(i)"
                >
                    <img :src="filterdCountryFlag[index][1]" alt="" />
                    <span>{{ i }}</span>
                </li>
            </ul>
        </div>
        <fa :icon="['fas', 'chevron-circle-down']" id="icon-chevron" class="icon"/>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useFetch from "../../composables/use-fetch";
import useCompareCountry from "../../composables/useCountry";

export default {
    name: "Dropdown",
    props: {
        currentCountry: {
            type: String,
            require: true,
        },
    },
    setup() {
        const { getAllCountryName, getAllCountryNameFlag } = useFetch();
        const { compareCountry , setCompareCountry } = useCompareCountry();

        const allCountry = getAllCountryName();
        const allFlag = getAllCountryNameFlag();

        const arrayOfSelectedCountry = ref([]);
        const selectedCountry = ref(compareCountry);

        const filterdCountry = computed(() => {
            // return allCountry.filter(
            //     (e) =>
            //         e !== props.currentCountry &&
            //         !arrayOfSelectedCountry.value.includes(e)
            // );
            return allCountry.sort()
        });

        const filterdCountryFlag = computed(() => {
            // return allFlag.filter((e) => e !== props.currentCountry);
            return allFlag;
        });

        const click = (value) => {
            setCompareCountry(value);
        };

        onMounted(() => {
            const inputField = document.querySelector(".chosen-value");
            const dropdown = document.querySelector(".value-list");
            const dropdownArray = [...document.querySelectorAll("li")];
            const icon = document.getElementById("icon-chevron");

            let valueArray = [];
            dropdownArray.forEach((item) => {
                valueArray.push(item.textContent);
            });
            inputField.addEventListener("input", () => {
                dropdown.classList.add("open");
                icon.classList.add("open")
                let inputValue = selectedCountry.value.toLowerCase();
                if (inputValue.length > 0) {
                    for (let j = 0; j < valueArray.length; j++) {
                        if (
                            !(
                                inputValue.substring(0, inputValue.length) ===
                                valueArray[j]
                                    .substring(0, inputValue.length)
                                    .toLowerCase()
                            )
                        ) {
                            dropdownArray[j].classList.add("closed");
                        } else {
                            dropdownArray[j].classList.remove("closed");
                        }
                    }
                } else {
                    for (let i = 0; i < dropdownArray.length; i++) {
                        dropdownArray[i].classList.remove("closed");
                    }
                }
            });

            dropdownArray.forEach((item) => {
                item.addEventListener("click", () => {
                    selectedCountry.value = item.textContent;
                    dropdownArray.forEach((dropdown) => {
                        dropdown.classList.add("closed");
                    });
                });
            });
            inputField.addEventListener("focus", () => {
                inputField.placeholder = "Type to filter";
                dropdown.classList.add("open");
                icon.classList.add("open")

                dropdownArray.forEach((dropdown) => {
                    dropdown.classList.remove("closed");
                });
            });

            // inputField.addEventListener("blur", () => {
            //     inputField.placeholder = "Select Country";
            //     dropdown.classList.remove("open");
            // });

            document.addEventListener("click", (evt) => {
                const isDropdown = dropdown.contains(evt.target);
                const isInput = inputField.contains(evt.target);
                if (!isDropdown && !isInput) {
                    dropdown.classList.remove("open");
                    icon.classList.remove("open")
                }
            });
        });

        return {
            filterdCountry,
            filterdCountryFlag,
            selectedCountry,
            arrayOfSelectedCountry,
            click,
        };
    },
};
</script>

<style lang="scss" scoped>
$font-color: #404244;
$dropdown-height: 3rem;

.wrapper {
    width: 100%;
    height: $dropdown-height;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .list {
        font-family: var(--primary--font);
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 4px;
        height: $dropdown-height;
        font-size: 1.1rem;
        padding: 1rem;
        background-color: #fafcfd;
        transition: 0.3s;

        &::-webkit-input-placeholder {
            color: #333;
        }
    }
}
.main-country {
    font-family: var(--primary--font);
    color: $font-color;
    font-weight: 700;
    font-size: 1.5rem;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
}
.icon {
    height: $dropdown-height;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    font-size: 1.3rem;
    color: #ff6384;
}
#icon-chevron {
    transition: .5s;
    position: absolute;
    right: 10px;
    &.open{
        transform: rotateZ(-180deg);
    }
}
.input-wrapper {
    margin-left: 1rem;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chosen-value,
.value-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.chosen-value {
    font-family: var(--primary--font);
    height: $dropdown-height;
    color: #d3d4d4;
    font-weight: 700;
    font-size: 1.5rem;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #f4f4f4;
    border-radius: 6px;

    &::-webkit-input-placeholder {
        color: #bdbdbd;
        font-weight: 700;
        font-size: 1rem;
    }

    &:hover {
        background-color: #ffffff;
        outline: 2px solid rgb(175, 175, 175);
        cursor: text;
    }

    &:focus,
    &.open {
        background-color: #ffffff;
        box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
        outline: 2px solid rgb(83, 192, 255);
        &::-webkit-input-placeholder {
        }
    }
}

.value-list {
    list-style: none;
    margin-top: ($dropdown-height + .1rem);
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-height: 0;
    transition: 0.3s;
    z-index: 10;
    &.open {
        max-height: 320px;
        overflow: auto;
    }

    li {
        position: relative;
        height: $dropdown-height;
        background-color: #fafcfd;
        padding: 1rem;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;
        opacity: 1;
        img {
            width: 50px;
            height: 30px;
            object-fit: cover;
            margin-right: 1rem;
        }
        &:hover {
            background-color: #e2e2e2;
        }

        &.closed {
            max-height: 0;
            overflow: hidden;
            padding: 0;
            opacity: 0;
        }
    }
}
</style>
